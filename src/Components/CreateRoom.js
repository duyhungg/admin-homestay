import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateRoom = () => {
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [first_image, setFirst_image] = useState("");
  const [main_image, setMain_image] = useState("");
  const [number_of_bed, setNumber_of_bed] = useState("");
  const [price, setPrice] = useState("");
  const [second_image, setSecond_image] = useState("");
  const [third_image, setThird_image] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User is not authenticated.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      };

      const data = {
        address: String(address),
        capacity: Number(capacity),
        description: String(description),
        first_image: String(first_image),
        main_image: String(main_image),
        number_of_bed: Number(number_of_bed),
        price: Number(price),
        second_image: String(second_image),
        third_image: String(third_image),
      };

      const response = await axios.post(
        "https://gin-homestay.onrender.com/api/admin/homestays",
        data,
        config
      );

      console.log(response.data);

      // Check the response for success or handle it accordingly
      navigate("/room");
    } catch (error) {
      console.error("Error when creating a new room", error);

      // Log the response data if available
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Create Room</h3>

          <div className="mb-3">
            <label>address</label>
            <input
              type="address"
              className="form-control"
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>capacity</label>
            <input
              type="capacity"
              className="form-control"
              placeholder="Enter capacity"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>description</label>
            <input
              type="description"
              className="form-control"
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>ảnh 1</label>
            <input
              type="first_image"
              className="form-control"
              placeholder="Enter first_image"
              onChange={(e) => setFirst_image(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>ảnh chính</label>
            <input
              type="main_image"
              className="form-control"
              placeholder="Enter main_image"
              onChange={(e) => setMain_image(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>number_of_bed</label>
            <input
              type="number_of_bed"
              className="form-control"
              placeholder="Enter number_of_bed"
              onChange={(e) => setNumber_of_bed(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>price</label>
            <input
              type="price"
              className="form-control"
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>ảnh 2</label>
            <input
              type="second_image"
              className="form-control"
              placeholder="Enter second_image"
              onChange={(e) => setSecond_image(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>ảnh 3</label>
            <input
              type="third_image"
              className="form-control"
              placeholder="Enter third_image"
              onChange={(e) => setThird_image(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" id="loginButton">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
