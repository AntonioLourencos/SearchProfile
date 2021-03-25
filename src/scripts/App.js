const App = () => {
  const user = document.getElementById("searchInput");
  const searchButton = document.getElementById("SearchButton");
  searchButton.addEventListener("click", () => {
    if (user.value === "") {
      OpenPopUpInputUndefined();
    } else if (user.value !== "") {
      GetProfile(user.value);
      GetRepos(user.value);
    }
  });
};

const GetProfile = (user) => {
  const url = `https://api.github.com/users/${user}`;
  const request = fetch(url);

  request
    .then((response) => response.json())
    .then((response) => {
      CheckUser(response);
    });
};

const GetRepos = (user) => {
  const url = `https://api.github.com/users/${user}/repos?per_page=6&sort=crated:%20asc`;
  request = fetch(url)
    .then((response) => response.json())
    .then((response) => ConstructRepos(response));
};

const CheckUser = (props) => {
  if (props.login === undefined) {
    OpenPopUpNotFoundProfile();
  } else if (props.login !== undefined) {
    ConstructProfile(props);
  }
};

const ConstructProfile = (props) => {
  const user = props;
  const Field = document.getElementById("Result");

  const Profile = `
  <div class="header-Result">
    <div class="header-part1">
      <div class="Result-img">
        <img src="${user.avatar_url}" alt="" />
      </div>
      <span>${user.name === null ? user.login : user.name}</span>
    </div>
    <div class="header-part2">
      <span>${user.login}</span>
      <span>Follower ${user.followers}</span>
      <span>Following ${user.following}</span>
      <span>${user.bio === null ? "I don't have biography yet" : user.bio}</span>
    </div>
  </div>
  <section id="repos"></section>
  `;
  Field.innerHTML = Profile;
};

const ConstructRepos = (props) => {
  const repos = props;
  const Field = document.getElementById("repos");

  let $Repo = "";

  repos.map((repo) => {
    $Repo += `   <div class="repo">
    <div class="Header-repo">
      <span>${repo.name}</span>
      <div>
        <span>Stars: ${repo.stargazers_count}</span>
        <span>forks: ${repo.forks_count}</span>
        <span> <a href="${repo.html_url}">Visit repos</a></span>
      </div>
    </div>
  </div>`;
  });

  Field.innerHTML = $Repo;
};

const OpenPopUpNotFoundProfile = () => {
  const PopUp = document.getElementById("notFoundProfile");
  const PopUpClose = document.getElementById("pop-up-close-notFoundProfile");
  PopUp.style.display = "flex";

  PopUpClose.addEventListener("click", () => {
    PopUp.style.display = "none";
  });
};

const OpenPopUpInputUndefined = () => {
  const PopUp = document.getElementById("inputUndefined");
  const PopUpClose = document.getElementById("pop-up-close-inputUndefined");
  PopUp.style.display = "flex";

  PopUpClose.addEventListener("click", () => {
    PopUp.style.display = "none";
  });
};

App();