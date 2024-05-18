import { getProfile } from "../api/posts/getProfile.mjs";
import { followProfile } from "../api/profiles/follow.mjs";
import { unFollowProfil } from "../api/profiles/unFollow.mjs";

export async function followFunction() {
  const profiles = await getProfile();
  const followBtn = document.getElementById("followBtn");
  const followers = document.getElementById("followers");
  followBtn.addEventListener("click", function () {
    const followNumber = JSON.parse(followers.innerText);
    if (followBtn.innerText === "Follow") {
      followBtn.innerText = "Following";
      followBtn.title = "Unfollow user";
      followProfile(profiles.data);
      followers.innerText = followNumber + 1;
    } else {
      followBtn.innerText = "Follow";
      unFollowProfil(profiles.data);
      followers.innerText = followNumber - 1;
    }
  });
}
