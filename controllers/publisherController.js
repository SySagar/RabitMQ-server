import { connect } from "amqplib";

const publishMessage = async (req,res) => {
  try {
    const queueName = req.body.queueName;
    const queueMessage = req.body.queueMessage;
    const connection = await connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue(queueName, { durable: false });

    // send data to queue
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(queueMessage)));

    // close the channel and connections
    await channel.close();
    await connection.close();

    res.send("Message Sent");
  } catch (error) {
    console.log(error);
  }
};

export default publishMessage;