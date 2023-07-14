import { connect } from "amqplib";

// const queue = 'hello';

const subscribeMessage = async (req,res) => {
    try {
      const notificationQueue = req.body.notificationQueueID || 'test';
      const connection = await connect(process.env.CLOUDAMQP_URL);
      const channel = await connection.createChannel();

      process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });
      
      var notificationMessage;
      var retrievedMessage;
      // console.log("queue",queue)
      await channel.consume(
        notificationQueue,
        (message) => {
          if (message) {
            console.log("message",message.content.toString())
              retrievedMessage = JSON.parse(message.content.toString());
              channel.ack(message);
              res.send(retrievedMessage)
          }

          // if(retrievedMessage.companyName === companyName){
          //   notificationMessage = retrievedMessage.queueMessage;
          // }
          // else
          // {
          //   notificationMessage = "No new notification";
          // }
        });
        if(retrievedMessage===undefined)
        res.send("no new notification");
  
      // console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
      console.warn(err);
    }
  };

export default subscribeMessage;