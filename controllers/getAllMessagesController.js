import { connect } from "amqplib";

// const queue = 'hello';

const getAllMessagesController = async (req,res) => {
    try {
      const queue = req.body.queueName || 'test';
    //   const companyName = req.body.companyName || 'none';
      const connection = await connect(process.env.CLOUDAMQP_URL);
      const channel = await connection.createChannel();

      process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });
      
      var result;
      await channel.assertQueue(queue, { durable: false });
     console.log("current queue",queue)
    await channel.consume(
        queue,
        (message) => {
            console.log("all message",message.content.toString())
            result = JSON.parse(message.content.toString());
        }
    )
        res.send(result);
  
      // console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
      console.warn(err);
    }
  };

export default getAllMessagesController;