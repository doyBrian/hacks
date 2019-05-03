import axios from "axios";

export default {
  // Gets all saved messages
  getHacks: function() {
    return axios.get("/api/hacks");
  },
  // Gets the saved message with the given id
  getHack: function(id) {
    return axios.get("/api/hacks/" + id);
  },
  // Updates the saved message with the given id
  updateHack: function(id, hackData) {
    return axios.put("/api/hacks/" + id, hackData);
  },
  // Deletes the saved message with the given id
  deleteHack: function(id) {
    return axios.delete("/api/hacks/" + id);
  },
  // Saves a message to the database
  saveHack: function(hackData) {
    return axios.post("/api/hacks", hackData);
  }
};
