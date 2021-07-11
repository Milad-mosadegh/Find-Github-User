const input = document.getElementById("search");
const resultSection = document.getElementById("result");
const form = document.getElementById("form");
const owner = document.getElementById("owner");
const submitBtn = document.getElementById("btn");

const checkB = document.getElementById("check");
const lable = document.getElementById("lable");

const images = document.getElementsByTagName("img");
const slide = document.getElementById("slide");

let lol;
checkB.addEventListener("change", () => {
  if (checkB.checked) {
    // resultSection.style.visibility = "hidden"
    lable.innerHTML = "View Avatar";
    lol = true;
  } else {
    lable.innerHTML = "Hide Avatar";
    lol = false;
  }
});

document.body.children.namedItem("image") ? alert("kdsjnk") : "";

form.addEventListener("submit", async e => {
  resultSection.innerHTML = "";
  e.preventDefault();
  const inputData = input.value;

  if (input.value === "") {
    alert("Input is empty");
  } else {
    const url = await `https://api.github.com/users/${inputData}/repos`;
    const fetchData = await fetch(url, { method: "GET" });
    const convertData = fetchData.json();
    convertData.then(x =>
      x.map(res => {
        console.log(res);
        owner.innerHTML = `Username: ${res.owner.login}`;
        owner.style.textAlign = "center";
        owner.style.padding = "20px 0";

        if (slide.checked === true) {
          resultSection.classList.remove("rowClass");
          resultSection.classList.add("gridClass");
          resultSection.innerHTML += `
                <div  class="card">
                    <img id="al" src="${res.owner.avatar_url}" class="${
            lol == true ? "hideImage" : "showImage"
          } card-img-top" height="250px" alt="..." >
                    <div class="card-body bg-dark">
                        <h5 class="card-title p-2  " >${res.name.toUpperCase()}</h5>
                        <p class="card-text p-2 ">Forks Count: ${
                          res.forks_count
                        }</p>
                        <p class="card-text p-2 ">Created at: ${
                          res.created_at
                        }</p>
                        <a href="${
                          res.html_url
                        }" target="_blank" class="btn btn-primary">Go to Repo</a>
                    </div>
                </div>

                `;
        } else {
          resultSection.classList.remove("gridClass");
          resultSection.classList.add("rowClass");
          resultSection.innerHTML += `
                <div class="bg-dark rowCard ">
                    <h5 class=" p-2  " >${res.name.toUpperCase()}</h5>
                    <p class="p-2 ">Forks Count: ${res.forks_count}</p>
                    <p class="p-2 ">Created at: ${res.created_at}</p>
                    <a href="${
                      res.html_url
                    }" target="_blank" class="btn btn-primary">Go to Repo</a>
                </div>


                `;
        }
      })
    );
  }
});
