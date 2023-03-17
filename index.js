//addEventListener('click', addMember);
class Member {
  constructor(firstName,lastName,role,cert){
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.cert = cert;
  }

}
console.log("Beginning of JS code");
document.getElementById('addMemberClick').addEventListener('click', addMemberForm);

//document.getElementById("submitNewMember").addEventListener("click", MemberService.createMember)
function addMemberForm() {//!SECTION this section builds the form to add a member
                          //NOTE - will only be accessible by admin
  
  const formDiv = document.getElementById('addMemberForm');
  const form = 
    `<form>

      <label for="newMemberTitle">New Member Information</label>
    <div class="form-group">
      <input type="name" class="form-control" id="id" placeholder="Unit/handle">
    </div>
    <div class="form-group">
      <input type="name" class="form-control" id="fname" placeholder="First Name">
    </div>
    <div class="form-group">
      <input class="form-control" id="lname" placeholder="Last Name">
    </div>
    <div class="form-group">
      <input class="form-control" id="role" placeholder="Role">
    </div>
    <div class="form-group">
      <input class="form-control" id="cert" placeholder="Highest Certification Level">
    </div>
    <button id="submitNewMember" type="button" class="btn btn-success">Submit</button>
    </form>
    `;
  const newForm = document.createElement('form');
  newForm.innerHTML = form;
  document.querySelector('body').appendChild(newForm);
  document.getElementById('addMemberClick').removeEventListener("click", addMemberForm);
  document.getElementById('submitNewMember').addEventListener('click', MemberService.createMember);

  
  }  

class MemberService {
  
  static url = 'https://640b8d1365d3a01f981d92a1.mockapi.io'

  static getAllMembers(){//!SECTION will return all the members
    return $.get(this.url);
  }
  static getMember(id){//will get an individual member
    return $.get(this.url + `/${id}`);
  }
  static createMember(member) {
    return $.post(this.url, member);
  }
  static updateMember(member) {//NOTE - this is the ajax method
    return $.ajax({
      url:this.url + `/${member.id}`,
      dataType: 'json',
      data: JSON.stringify(member),
      contentType: 'application/json',
      type: 'PUT'
    });
  }
  static deleteMember(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: 'DELETE'
    });
  }
}
  
  class DOMManager {
    static members;
    static getAllMembers(){
      MemberService.getAllMembers().then(members => this.render(members));
    }
    static render(members){
      this.members = members;
      $('#newMemberBody').empty();
      for (let member of members){
        $('#newMemberBody').prepend(
          `<tr id="${member.id}">
            <td><button type="button" class="btn btn-danger pull-left" style: float>Delete</button></td>
            <td scope="col">${[i]+1}</td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
          `
        )
      }
    }
    //let newMember = [];
    
    static addMember(firstName, lastName, role, cert){
      this.firstName = document.getElementById("fname").value;
      this.lastName = document.getElementById("lname").value;
      this.role = document.getElementById("role").value;
      this.cert = document.getElementById("cert").value;
      MemberService.createMember(new Member(firstName, lastName, role, cert))
      .then(() => {
        //return MemberService.getAllMembers();
        return $.ajax({
          url:this.url,
          dataType: 'json',
          data: JSON.stringify(member),
          contentType: 'application/json',
          type: 'POST'
        });
      })
      .then((members) => this.render(members));
    }
    static deleteMember(id){
      MemberService.deleteMember(id)
      .then(() => {
        return MemberService.getAllMembers();
      })
      .then((members) => this.render(members));

    }
  }
  DOMManager.getAllMembers();