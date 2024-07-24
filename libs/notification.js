const Notification = require('../api/models/notification');
const moment = require('moment');
function notification(notify){
    var FCM = require('fcm-node');
    var serverKey = 'AAAArm1E1wc:APA91bHmfwSYh8LaGtNG5AalpHv3pyyivBG--Xr9a3PROieqXuwyOHlaT5QNqbv5gJkCB7nct4WgjFDyldZoIy47zb-maSRMWhCUwjBcQhWIvJHZ1Iv8i_q0D8a2Bkxu0rkD30ZNjwda'; //put your server key here
    var fcm = new FCM(serverKey);
    var message = {
    to: notify.device_token,
        notification: {
            title: notify.title, 
            body: notify.body
        },
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err);
        } 
        else {
            console.log("Successfully sent with response: ", response);
            console.log(JSON.stringify(message))
        }
    });
    if(notify.hasOwnProperty('userId')){
        var createdAt = moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss");
        var  notification = new Notification({
            title:notify.title,
            body:notify.body,
            userId:notify.userId,
            receiverId:notify.receiverId,
            createdAt:createdAt
        })
        notification.save().then((res)=>{
            console.log(Notification)
        })
    }
}


module.exports = notification