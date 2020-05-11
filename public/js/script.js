onlineStats = io("http://localhost:3010");
let member = document.getElementById('onlineId').value;
let onlineBoard = document.getElementById('onlineStats');
let name, id;
if (member) {

  member = member.split(',');
  name = member[0];
  id = member[1];


  onlineStats.emit('onlineMember', name, id);
}

onlineStats.on('memberData', (users) => {
  console.log(users)
  let userKey = Object.keys(users);
  console.log(userKey);
  let data = Object.values(users);
  console.log(data);

  // if (onlineBoard.hasChildNodes()) {
  //   onlineBoard.innerHTML = '';
  // }



  // let ValidUser = data.filter(x => x.id != id);
  // console.log(ValidUser);
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      onlineBoard.innerHTML = '';
    }

    let row = document.createElement('tr');

    row.setAttribute('class', "rowers");

    let name = document.createElement('td');

    name.innerHTML = data[i].name;
    let srNo = document.createElement('th');
    srNo.textContent = i + 1;
    let label = document.createElement('label');
    let icon = document.createElement('i');
    icon.setAttribute('class', "fa fa-toggle-on tedata[i]t-danger");
    icon.setAttribute('aria-hidden', "true");
    label.appendChild(icon);
    row.append(srNo);

    row.append(name);
    row.append(label);

    onlineBoard.insertAdjacentElement('beforeend', row);

  }



})






$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


















