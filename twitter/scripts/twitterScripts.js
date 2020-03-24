function toProfile() {
    var tweets = document.getElementById('middle-stream-twits');
    tweets.style.display = "none";

    var profile = document.getElementById('middle-stream-profile');
    profile.style.display = "block";
}

function toHome() {
    var tweets = document.getElementById('middle-stream-twits');
    tweets.style.display = "block";

    var profile = document.getElementById('middle-stream-profile');
    profile.style.display = "none";
}

window.onload = function () {
    var profileInfo = {
        profileName: "Carmel Bar-Hanan",
        coverPhotoPath: "images/coverPhoto.jfif",
        profilePhotoPath: "profile.jpg",
        bio: "Born and raised here so I am part of twitter and always be",
        linkToProfile: "\@carmelBarHanan",
        location: "Tel-Aviv",
        joinedTime: "May 2018",
        website: "carmel.barhanan.com",
        numOfTweets: 131,
        numOfFollowing: 231,
        numOfFollowers: 155
    };

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

    var div = document.createElement("div");
    document.getElementById('middle-stream-profile').appendChild(div)

};