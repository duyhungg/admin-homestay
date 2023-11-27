import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedApi, setSelectedApi] = useState(null);
  const [data, setData] = useState(null);
  const handleClickValidate = async () => {
    setSelectedApi("api1");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User is not authenticated.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        "https://gin-homestay.onrender.com/api/admin/list_booking_validated",
        config
      );

      setData(res.data);
    } catch (error) {
      console.error("Lỗi khi gọi API", error);
    }
  };

  const handleClickConfirm = async () => {
    setSelectedApi("api2");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User is not authenticated.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        "https://gin-homestay.onrender.com/api/admin/list_booking_confirmed",
        config
      );

      setData(res.data);
    } catch (error) {
      console.error("Lỗi khi gọi API", error);
    }
  };

  const handleClick = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User is not authenticated.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `https://gin-homestay.onrender.com/api/admin/confirmed_booking/${bookingId}`,
        null,
        config
      );
    } catch (error) {
      console.error("Lỗi khi gọi API", error);
    }
  };
  return (
    <main className="container">
      <button
        onClick={handleClickValidate}
        className={`btn ${
          selectedApi === "api1" ? "btn-primary" : "btn-secondary"
        } me-2 mt-2`}
      >
        Danh sách cần duyệt
      </button>
      <button
        onClick={handleClickConfirm}
        className={`btn ${
          selectedApi === "api2" ? "btn-primary" : "btn-secondary"
        } me-2 mt-2`}
      >
        Danh sách đã duyệt
      </button>

      {data?.list_booking && (
        <div className="mt-3">
          <h2>Danh sách</h2>
          <ul className="list-group">
            {data.list_booking.map((item) => (
              <li key={item?.booking.booking_id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-primary me-2">
                      Home Stay: {item?.booking.homestay_booking}
                    </span>
                    <span className="badge bg-secondary">
                      status: {item?.booking.status}
                    </span>
                  </div>
                  <div>
                    <span className="badge bg-secondary">
                      Full Name: {item?.user_booking.full_name}
                    </span>
                    <span className="badge bg-primary me-2">
                      Email: {item?.user_booking.email}
                    </span>
                    <span className="badge bg-secondary">
                      Điện thoại: {item?.user_booking.phone}
                    </span>
                  </div>
                  {selectedApi === "api1" ? (
                    <button
                      onClick={() => handleClick(item?.booking.booking_id)}
                      className="btn btn-success"
                    >
                      Confirm
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default HomePage;
