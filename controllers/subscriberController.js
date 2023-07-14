import { connect } from "amqplib";

// const queue = 'hello';

const subscribeMessage = async (req,res) => {
    try {
      const queue = req.body.queueName;
      const connection = await connect(process.env.CLOUDAMQP_URL);
      const channel = await connection.createChannel();

      process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });
      
      var notificationMessage;
      await channel.assertQueue(queue, { durable: false });
      console.log("queue",queue)
      await channel.consume(
        queue,
        (message) => {
          console.log("message",message.content.toString())
          if (message) {
              notificationMessage = JSON.parse(message.content.toString());
          }
        },
        { noAck: true }
        );
        res.send(notificationMessage);
  
      // console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
      console.warn(err);
    }
  };

export default subscribeMessage;