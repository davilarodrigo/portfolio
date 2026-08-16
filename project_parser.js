async function loadProjects() {
  const response = await fetch("./projects.csv");
  const csv = await response.text();

  const projects = parseCSV(csv);
  const container = document.querySelector("#projects");

  const customCards = [...container.children];

  const projectCards = projects.map(project => `
    <article
      class="card${project.height ? " height-2" : ""}${project.image ? " has-image" : ""}${project.width ? " width-2" : ""}"
      
      data-order="${project.order}"
    >
      <div class="card-bar">
        <span></span>
        <span></span>
        <span></span>
        <small>${project.file}</small>
      </div>

      ${project.image ? `<img class="card-image" src="./img/${encodeURIComponent(project.image)}" alt="${project.title}">` : ""}

      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>

        <p class="card-desc">
          ${project.description}
        </p>

        <div class="tags">
          ${project.tags
            .split(",")
            .map(tag => `<span>${tag.trim()}</span>`)
            .join("")}
        </div>

        <div class="card-actions">
          <a class="card-go" href="${project.link}" target="_blank" rel="noopener">
            view project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          ${project.repo_link ? `
            <a class="card-go card-repo" href="${project.repo_link}" target="_blank" rel="noopener">
              view repo code
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ` : ""}
        </div>
      </div>
    </article>
  `);

  container.innerHTML = projectCards.join("");

  customCards.forEach(card => {
    container.appendChild(card);
  });

  const cards = [...container.children];

  cards.sort((a, b) => {
    return Number(a.dataset.order) - Number(b.dataset.order);
  });

  cards.forEach(card => container.appendChild(card));
}

function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(";").map(header => header.trim());

  return lines.slice(1).map(line => {
    const values = line.split(";");

    return headers.reduce((project, header, index) => {
      project[header] = values[index]?.trim() || "";          
      return project;
    }, {});
  });
}

loadProjects();
