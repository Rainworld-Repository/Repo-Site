const BASE_URL = window.location

async function fetchFiles(path) {
  try {
    const response = await fetch(`./${path}/files.json`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json' // Specify API version
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // This will be an array of objects representing files and directories
  } catch (error) {
    console.error('Error fetching GitHub directory:', error);
    return null;
  }
}

async function tryFetch(url) {
    try {
        let r = await fetch(url)
        return r.ok
    }
    catch (error) {
        return false;
    }
}

async function generatePacks() {
    const categories = document.getElementsByClassName("category")
    if (categories && categories.length > 0) {
        for (i = 0; i < categories.length; i++) {
            let category = categories[i]
            let packFolder = category.getAttribute("packfolder")
            if (packFolder) {
                // We have a packfolder attribute to inject into
                
                let grid = document.createElement("div")
                grid.classList.add("grid")
                grid.id = "first_grid"
                category.appendChild(grid)
    
                fetchFiles(packFolder)
                .then((json) => {
                    if (json) {
                        for (i = 0; i < json.length; i++) {
                            let item = json[i]
                            if (i == 0) {
                                continue
                            }
                            let button = document.createElement("a")
                            button.href = item.path
                            button.download = item.name
                            button.draggable = false
                            grid.appendChild(button)

                            let border = document.createElement("div")
                            border.classList.add("border")
                            button.appendChild(border)

                            let zipText = item.name
                            let fileName = zipText.split('.')[0]

                            let img = document.createElement("img")
                            let directories = packFolder.split("/")

                            let imgUrl = `assets/media/img/lists/${directories[directories.length - 1].toLowerCase()}/${fileName}.webp`
                            tryFetch(imgUrl)
                            .then((res) => {
                                if (res) {
                                img.src = imgUrl
                                }
                                else {
                                    img.src = "assets/media/img/default.webp"
                                }
                            })
                            

                            img.alt = fileName
                            img.draggable = false
                            button.appendChild(img)

                            let header = document.createElement("h3")
                            header.innerHTML = fileName
                            button.appendChild(header)
                        }
                    }
                })
            }
        }
    } 
}
generatePacks();
