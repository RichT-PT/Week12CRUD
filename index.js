class Members {
  constructor(fname,lname,role,cert){
    this.fname = fname;
    this.lname = lname;
    this.role = role;
    this.cert = cert;
  }

}
class MemberService {
  static url = 'https://app.apidog.com/web/project/359481'
  static getAllMembers(){
    return $.get(this.url);
  }
  static getMember(id){
    return $.get(this.url + `/${id}`);
  }
  static createMember(member) {
    return $.post(this.url, member);
  }
  static updateMembers(member) {
    return $.ajax({
      url:this.url + `/${member._id}`,
      dataType: 'json',
      data: JSON.stringify(member),
      contentType: 'application/json',
      type: 'PUT'
    });
  }
  static deleteMember(id) {
    return $.ajac({
      url: this.url + `/${id}`,
      type: 'DELETE'
    });
    
  }
}


function addMemberToRoster() {
    Swal.fire({
      title: "Add Member",
      html:
        '<input id="id" type="hidden">' +
        '<input id="fname" class="swal2-input" placeholder="First">' +
        '<input id="lname" class="swal2-input" placeholder="Last">' +
        '<input id="role" class="swal2-input" placeholder="role">' +
        '<input id="cert" class="swal2-input" placeholder="Highest Cert:">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      },
    });
  }
  
  function addMember() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const role = document.getElementById("role").value;
    const cert = document.getElementById("cert").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://www.mecallapi.com/api/users/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        fname: fname,
        lname: lname,
        username: role,
        email: cert,
        avatar: "https://www.mecallapi.com/users/cat.png",
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }
  class DOMManager {
    static members;
    static getAllMembers(){
      MemberService.getAllMembers(),then(members => this.render(members));

    }
    static render(members){
      this.members = members;
      $('#app').empty();
      for (let member of members){
        $('#app').prepend(
          `<tr id="${member.id}">
            <th scope="col">${members[i]+1}</th>
            <td scope="col"><intput type="text" id = "${member._id}-fname" scope="col" placeholder="fname"</td>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Role</th>
            <th scope="col">Highest Cert:</th>
          `
        )
      }
    }
  }
  DOMManager.getAllMembers();