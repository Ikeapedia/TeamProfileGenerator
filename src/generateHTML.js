const createMangagerCard = (manager) => {
    return `
    <div class = "col-4 mt-4">
        <div class = "card h-100">
            <div class = "card-header">
                <h3>${manager.name}</h3>
                <h4>Manager</h4><span class="material-symbols-outlined">assignment</span>
            </div>

            <div class = "card-body">
                <p class = "id">ID: ${manager.id}</p>
                <p class = "email">Email: <a href = "mailto:${manager.email}">${manager.email}</a></p>
                <p class = "office">Office Number: ${manager.office}</p>
            </div>

        </div>
    </div>
    `;
}


const createEngineerCard = (engineer) => {
    return `
    <div class = "col-4 mt-4">
        <div class = "card h-100">
            <div class = "card-header">
                <h3>${engineer.name}</h3>
                <h4>Engineer</h4><span class="material-symbols-outlined">engineering</span>
            </div>

            <div class = "card-body">
                <p class = "id">ID: ${engineer.id}</p>
                <p class = "email">Email Address: <a href = "mailto:${engineer.email}">${engineer.email}</a></p>
                <p class = "github">GitHub: <a href = "https://github.com/${engineer.github}">${engineer.github}</p>
            </div>

        </div>
    </div>
    `;
}

const createInternCard = (intern) => {
    return `
    <div class = "col-4 mt-4">
        <div class = "card h-100">
            <div class = "card-header">
                <h3>${intern.name}</h3>
                <h4>Intern</h4><span class="material-symbols-outlined">history_edu</span>
            </div>

            <div class = "card-body">
                <p class = "id">ID: ${intern.id}</p>
                <p class = "email">Email Address: <a href = "mailto:${intern.email}">${intern.email}</a></p>
                <p class = "school">School: ${intern.school}</p>
            </div>

        </div>
    </div>
    `;
}

generateHTML = (data) => {

    htmlArray = [];

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole();

        if (role === 'Manager') {
            const managerCard = createMangagerCard(employee);

            htmlArray.push(managerCard);
        }

        if (role === 'Engineer') {
            const engineerCard = createEngineerCard(employee);

            htmlArray.push(engineerCard);
        }

        if (role === 'Intern') {
            const internCard = createInternCard(employee);

            htmlArray.push(internCard);
        }
    }

    const employeeCards = htmlArray.join('');

    const createTeam = createTeamHtml(employeeCards);
    return createTeam;
}

const createTeamHtml = (employeeCards) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Profile</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Nerko+One:Regular+400" rel="stylesheet">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <header>
          <nav class="navbar" id="navbar">
              <span class="navbar-brand mb-0 h1 w-100 text-center" id="navbar-text">Team Profile</span>
          </nav>
      </header>
      <main>
          <div class="container">
              <div class="row justify-content-center" id="team-cards">
                  <!--Team Cards-->
                  ${employeeCards}
              </div>
          </div>
      </main>
      
  </body>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </html>
`;
}

module.exports = generateHTML;