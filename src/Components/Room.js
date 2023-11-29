import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Room = () => {
  const [homestays, setHomestays] = useState([]);
  const [id, setId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://gin-homestay.onrender.com/api/homestays/?page_id=${1}&page_size=${10}`,
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );
        console.log(res.data.homestays); // Log the API response
        setHomestays(res.data.homestays);
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User is not authenticated.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      };

      await axios.delete(
        `https://gin-homestay.onrender.com/api/admin/homestays/${id}`,
        config
      );
      setHomestays((prevHomestays) =>
        prevHomestays.filter((homestay) => homestay.homestay.id !== id)
      );
    } catch (error) {
      console.error("Lỗi khi xóa phòng", error);
    }
  };
  return (
    <main className="container">
      <div className="mt-3">
        <h2>Danh sách</h2>
        <ul className="list-group">
          {homestays.map((homestay) => (
            <li key={homestay.homestay.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-primary me-2">
                    Home Stay id: {homestay.homestay.id}
                  </span>
                  <span className="badge bg-secondary">
                    Số lượng giường: {homestay.homestay.number_of_bed}
                  </span>
                </div>
                <div>
                  <span className="badge bg-secondary">
                    Giá tiền: {homestay.homestay.price} $
                  </span>
                  <span className="badge bg-primary me-2">
                    Stratus: {homestay.homestay.status}
                  </span>
                  <span className="badge bg-secondary">
                    Sức chứa: {homestay.homestay.capacity}
                  </span>
                </div>
                <Link
                  className="btn btn-success"
                  to={`/update/${homestay.homestay.id}`}
                >
                  Update
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(homestay.homestay.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Link className="btn btn-success mt-5 me-5" to="/createroom">
          Thêm
        </Link>
        <Link className="btn btn-success mt-5" to="/user">
          Quay lại
        </Link>
      </div>
    </main>
  );
};

export default Room;
