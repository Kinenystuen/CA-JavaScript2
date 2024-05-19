import { getProfile, getYourProfile } from "../api/posts/getProfile.mjs";

const followingContainer = document.getElementById("followingContainer");

export async function displayFollowing() {
  // Display user profile's followers
  const profiles = await getProfile();
  const profile = profiles.data;

  // Display followers
  const container = document.createElement("div");

  container.classList.add("container", "pb-5");
  // card.classList.add("card-body");

  profile.following.forEach((follower) => {
    const card = document.createElement("div");
    const cardLink = document.createElement("a");
    const avatarImg = document.createElement("img");
    const username = document.createElement("strong");

    card.classList.add("card", "position-relative", "m-4", "custom-max-width");
    cardLink.href = `/html/pages/profile.html?user=${follower.name}`;
    cardLink.title = `Go to ${follower.name}'s profile`;
    cardLink.classList.add(
      "d-flex",
      "align-items-center",
      "gap-2",
      "link-body-emphasis",
      "text-decoration-none",
      "custom-hover"
    );

    avatarImg.src = follower.avatar.url;
    avatarImg.classList.add("rounded-circle", "m-2", "object-fit-cover");
    avatarImg.setAttribute("width", "50");
    avatarImg.setAttribute("height", "50");

    username.innerText = follower.name;

    cardLink.appendChild(avatarImg);
    cardLink.appendChild(username);
    card.appendChild(cardLink);
    container.appendChild(card);
  });

  followingContainer.appendChild(container);
}

