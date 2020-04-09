function toProfile() {
    loadProfileData();
    var tweets = document.getElementById('middle-stream-twits');
    tweets.style.display = "none";

    var profile = document.getElementById('middle-stream-profile');
    profile.style.display = "block";
}

var btn = document.getElementById("edit-profile");
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModal = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function toHome() {
    var tweets = document.getElementById('middle-stream-twits');
    tweets.style.display = "block";

    var profile = document.getElementById('middle-stream-profile');
    profile.style.display = "none";
}

profileInfo = {
    profileName: "Carmel Bar-Hanan",
    coverPhotoPath: "images/coverPhoto.jfif",
    profilePhotoPath: "images/profile.jpg",
    bio: "Born and raised here so I am part of twitter and always be",
    linkToProfile: "\@carmelBarHanan",
    location: "Tel-Aviv",
    joinedTime: "May 2018",
    website: "carmel.barhanan.com",
    numOfTweets: 131,
    numOfFollowing: 231,
    numOfFollowers: 155
};

loadProfileData = function () {

    document.getElementsByClassName('profile-name')[0].innerHTML = profileInfo.profileName;
    document.getElementsByClassName('profile-name')[1].innerHTML = profileInfo.profileName;
    document.getElementById('numOfTweets').innerText = profileInfo.numOfTweets + ' Tweets';
    document.getElementById('profilePage').src = profileInfo.profilePhotoPath;
    document.getElementById('coverPhoto').src = profileInfo.coverPhotoPath;
    document.getElementById('personalDiscription').innerText = profileInfo.bio;
    document.getElementById('personalProfile').innerText = profileInfo.linkToProfile;
    document.getElementsByClassName('personal-description')[0].innerHTML = profileInfo.location;
    document.getElementsByClassName('personal-description')[1].innerHTML = profileInfo.website;
    document.getElementsByClassName('personal-description')[2].innerHTML = profileInfo.joinedTime;
    document.getElementsByClassName('follow-info')[0].innerHTML = profileInfo.numOfFollowing + ' Following';
    document.getElementsByClassName('follow-info')[1].innerHTML = profileInfo.numOfFollowers + ' Followers';
    var div = document.createElement("div");
    document.getElementById('middle-stream-profile').appendChild(div)

};

saveProfileEdit = function() {
    var name = document.getElementById('fname').value;
    if (name !== '') {
        profileInfo.profileName = name;
    }
    var bio = document.getElementById('fbio').value;
    if (bio !== '') {
        profileInfo.bio = bio;
    }
    var location = document.getElementById('flocation').value;
    if (location !== '') {
        profileInfo.location = location;
    }
    closeModal();
    toProfile();
};

window.onload = function setTweets() {
    localStorage.setItem('tweetsList', JSON.stringify(tweetsList));
    localStorage.setItem('trends', JSON.stringify(trends));
    loadTrends();
    Tweets.loadTweets();
    setInterval(()=>{
        Tweets.loadTweets()
    }, 3000);
};



tweetsList = [
    {
    profilePhotoPathToTweeter: "images/profile.jpg",
    tweeterName: "Carmel Bar-Hanan",
    tweetContent: "Yes, The seaweed is always greener, In somebody else's lake. You dream about going up there, But that is a big mistake",
    timeOfTweet: "March 30 2020, 14:20",
    numberOfLikes: 1
    }, {
    profilePhotoPathToTweeter: "images/profile2.jpg",
    tweeterName: "Etai Bar-Hanan",
    tweetContent: "Down here all the fish is happy, As off through the waves they roll. Yes, The fish on the land ain't happy, They sad 'cause they in their bowl",
    timeOfTweet: "March 31 2020, 10:41",
    numberOfLikes: 4
    }
];

trends = [
    {
        trendSubject: "Health trending",
        trendContent: "#Covid_19",
        numOfTweets: "10.6K"
    }, {
        trendSubject: "Politics trending",
        trendContent: "#Coronavirus",
        numOfTweets: "1.55M"
    }, {
        trendSubject: "Politics trending",
        trendContent: "#Israel_elections",
        numOfTweets: "8,315"
    }, {
        trendSubject: "Trending in Israel",
        trendContent: "#Omer_Adam",
        numOfTweets: "2,416"
    }
];

loadTrends = function() {
    var trendsList = JSON.parse(localStorage.getItem('trends') ) || {};
    let temp = document.getElementsByTagName("template")[2];
    trendsList.forEach(trend => {
        let clon = temp.content.cloneNode(true);
        clon.querySelector("#trendSubject").innerHTML = trend.trendSubject;
        clon.querySelector("#trendContent").innerHTML = trend.trendContent;
        clon.querySelector("#numOfTrendsTweets").innerHTML = trend.numOfTweets + ' Tweets';
        document.getElementById("trendsBox").appendChild(clon);
    });
};



class Tweets {
     static saveNewTweet = async function() {
        var tweetInput = document.getElementById("tweetInput").value;
         var tweetsList = await Tweets.getTweets();
         tweetsList[Object.keys(tweetsList).length] = {
             profilePhotoPathToTweeter: "images/profile.jpg",
             tweeterName: "Carmel Bar-Hanan",
             tweetContent: tweetInput,
             timeOfTweet: Tweets.getNowTime(),
             numberOfLikes: 0
         };
         localStorage.setItem('tweetsList', JSON.stringify(tweetsList));
         Tweets.loadNewTweet();
     };

    static getNowTime() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        return date+' '+time;
    }

    static loadTweets = async function() {
        document.getElementById("tweets").innerHTML = "";
        var tweetsList = await Tweets.getTweets();
        let temp = document.getElementsByTagName("template")[0];
        tweetsList.forEach(tweet => {
                let clon = temp.content.cloneNode(true);
                clon.querySelector("article").setAttribute("id", "tweet" + tweetsList.indexOf(tweet));
                clon.querySelector("#profilePicOfTweeter").src = tweet.profilePhotoPathToTweeter;
                clon.querySelector("#TweetAuthor").innerHTML = tweet.tweeterName;
                clon.querySelector("#tweenContent").innerHTML = tweet.tweetContent;
                clon.querySelector("#timeOfTweet").innerHTML = tweet.timeOfTweet;
                clon.querySelector("#numOfLikes").innerHTML = tweet.numberOfLikes;
                document.getElementById("tweets").appendChild(clon);
        });
     };

    static getTweets  = async function() {
         return JSON.parse(localStorage.getItem('tweetsList') ) || {};
    };

    static loadNewTweet = async function() {
        var tweetsList = await Tweets.getTweets();
        let temp = document.getElementsByTagName("template")[0];
            let clon = temp.content.cloneNode(true);
            var tweetsListSize = Object.keys(tweetsList).length;
            clon.querySelector("article").setAttribute("id", "tweet" + tweetsListSize);
            clon.querySelector("#profilePicOfTweeter").src = tweetsList[tweetsListSize - 1].profilePhotoPathToTweeter;
            clon.querySelector("#TweetAuthor").innerHTML = tweetsList[tweetsListSize - 1].tweeterName;
            clon.querySelector("#tweenContent").innerHTML = tweetsList[tweetsListSize - 1].tweetContent;
            clon.querySelector("#timeOfTweet").innerHTML = tweetsList[tweetsListSize - 1].timeOfTweet;
            clon.querySelector("#numOfLikes").innerHTML = tweetsList[tweetsListSize - 1].numberOfLikes;
            document.getElementById("tweets").appendChild(clon);
    };

    static addLikeToTweet= async function(obj) {
        var idOfTweet = obj.parentElement.parentElement.getAttribute("id");
        var numOfTweet = idOfTweet.split('tweet')[1];
        Tweets.getTweets().then(tweetsList => {
            tweetsList[numOfTweet].numberOfLikes += 1;
            localStorage.setItem('tweetsList', JSON.stringify(tweetsList));
        });
    };

    static deleteTweet = async function(obj) {
        var idOfTweet = obj.parentElement.parentElement.getAttribute("id");
        var numOfTweet = idOfTweet.split('tweet')[1];
        Tweets.getTweets().then(tweetsList => {
            tweetsList.splice(numOfTweet, 1);
            localStorage.setItem('tweetsList', JSON.stringify(tweetsList));
        });
    }

    static searchInTweets = async function(search) {
        var tweetsList = await Tweets.getTweets();
        var resList = [];
        tweetsList.forEach(tweet => {
            if (tweet.tweetContent.includes(search)) {
                resList.push(tweet)
                }
            }
        );

        let temp = document.getElementsByTagName("template")[1];
        resList.forEach(tweet => {
            let clon = temp.content.cloneNode(true);
            clon.querySelector("#profileImageOfTweet").src = tweet.profilePhotoPathToTweeter;
            clon.querySelector("#tweeterNameFound").innerHTML = tweet.tweeterName;
            clon.querySelector("#tweetContentFound").innerHTML = tweet.tweetContent;
            document.getElementById("searchedTweetsList").appendChild(clon);
        });

    }
}



