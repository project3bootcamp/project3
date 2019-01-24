import axios from "axios";
export default class AutoSave 
{
  constructor(saveFn, intervalInMs) {
    this.saveFn = saveFn;
    this.setIntervalId = setInterval(
        () => { 
            this.save();
        }, 
        intervalInMs
    );
  }


  save() {
    this.saveFn();
    this.callOnSaveCallback();
  }

  onSave(savedsearches) {
    axios.post('/user/update',savedsearches) 
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