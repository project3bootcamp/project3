import axios from "axios";
import decode from 'jwt-decode';
export default class AutoSave 

{
  constructor(saveFn) {
    this.saveFn = saveFn;

  }
getId() {
  const token = localStorage.getItem('jwtToken');
  const decoded = decode(token);
  console.log(decoded.id)
  return decoded.id

}


  onSave(savedsearches) {
      console.log(savedsearches);
    const id = this.getId();
    const savedItem = {
        id: id,
        actor1: savedsearches.actor1,
        actor2: savedsearches.actor2
    }
    console.log(savedItem);
    axios.post('/user/update',savedItem) 
    .catch(err => {
        console.log(err);
    });
  };

  // private method that calls onSaveCallback
  callOnSaveCallback() {
    if(this.onSaveCallback != null)
        this.onSaveCallback();
  }

}