/*DOM*/
const btn = document.getElementById('search');
const error = document.getElementById("error");
const result = document.querySelector(".result");
const dataD = document.querySelectorAll('.dataY');
const iconD = document.querySelectorAll('.iconD');
const test = document.getElementById("t");

/*Data*/
const logo = document.getElementById("logo");
const date = document.getElementById("date");
const pseudo = document.getElementById("pseudo");
const tw = document.getElementById("tw");
const desc = document.getElementById("desc");
const descHeader = document.getElementById("desc-header");
const repo = document.getElementById("repo");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const loc = document.getElementById("loc");
const web = document.getElementById("web");
const twitter = document.getElementById("twitter");
const github = document.getElementById("github");

result.style.display = "none";

btn.addEventListener("click", function () {
    const valeur = document.getElementById("result").value;

    //Fetch
    fetch(`https://api.github.com/users/${valeur}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    //Displaying the content when calling fetch
                    result.style.display = "block";
                    error.style.display = "none";

                    //Display of the content of the different data of the API
                    logo.src = data.avatar_url;
                    pseudo.textContent = data.login;
                    tw.textContent = "@" + data.twitter_username
                    desc.textContent = data.bio;
                    descHeader.textContent = data.bio;
                    repo.textContent = data.public_repos;
                    followers.textContent = data.followers;
                    following.textContent = data.following;
                    loc.textContent = data.location;
                    web.textContent = data.blog;
                    web.href = `${data.blog}`;
                    twitter.textContent = "@" + data.twitter_username;
                    github.textContent = "@" + data.company;

                    //Date management
                    let day = new Date(data.created_at);
                    let localDate = day.toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                    date.textContent = "Joined" + " " + localDate;

                    //Error condition
                    dataD.forEach(elt => {
                        if (elt.textContent.length === 0) {
                            elt.textContent = "Not available";
                            elt.style.color = "#A4B4CC";
                            web.style.pointerEvents = "none";


                            iconD.forEach(elt => {
                                elt.style.color = "#A4B4CC";
                            })
                        }
                    });

                    if (desc.textContent.length === 0) {
                        desc.textContent = "This profile has no bio";
                    }
                })
            } else {
                error.textContent = "No results";
                error.style.display = "block";
                result.style.display = "none";
            }
        })
});

//DarkMode
const darkMode = document.getElementById('dark-mode');
const darkSpan = document.getElementById('dark-span');
const darkLogo = document.getElementById('dark-logo');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains("dark")) {
        darkSpan.textContent = "light";
        darkLogo.classList.remove("fa-moon");
        darkLogo.classList.add("fa-sun");

    } else {
        darkSpan.textContent = "dark";
        darkLogo.classList.remove("fa-sun");
        darkLogo.classList.add("fa-moon");
    }
})




