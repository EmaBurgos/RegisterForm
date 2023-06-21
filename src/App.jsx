import "./App.css";
import { useEffect, useState } from "react";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /^(?=.*[0-9]).{6,64}$/;
const notNumbers = /^[A-Za-z]+$/;
const phoneNumberRegex = /^[0-9]+$/;

const validateSingIn = (inputs) => {
  const errors = {
    name: "válido✔️",
    surname: "válido✔️",
    email: "Email válido ✔️",
    password: "Contraseña válida ✔️",
    passwordRepeat: "Las constraseñas coinciden ✔️",
    phoneNumber: "Celular válido ✔️",
    flag: false,
  };

  if (!notNumbers.test(inputs.name)) {
    errors.name = "Solo letras❌";
    errors.flag = true;
  }

  if (!inputs.name) {
    errors.name = "";
    errors.flag = true;
  }

  if (!notNumbers.test(inputs.surname)) {
    errors.surname = "Solo letras❌";
    errors.flag = true;
  }

  if (!inputs.surname) {
    errors.surname = "";
    errors.flag = true;
  }

  if (!emailRegex.test(inputs.email)) {
    errors.email = "Email inválido❌";
    errors.flag = true;
  }

  !inputs.email && (errors.email = "");

  if (!passwordRegex.test(inputs.password)) {
    errors.password = "Debe tener un número y al menos 6 caracteres ❌";
    errors.flag = true;
  }

  !inputs.password && (errors.password = "");

  if (inputs.passwordRepeat !== inputs.password) {
    errors.passwordRepeat = "Las contraseñas no coinciden❌";
    errors.flag = true;
  }

  !inputs.passwordRepeat && (errors.passwordRepeat = "");

  if (!phoneNumberRegex.test(inputs.phoneNumber)) {
    errors.phoneNumber = "Solo numeros y mas de 8❌";
    errors.flag = true;
  }

  (inputs.phoneNumber.length < 8 || inputs.phoneNumber.length > 15) &&
    (errors.phoneNumber = "Solo numeros y mas de 8❌");

  if (!inputs.phoneNumber) {
    errors.phoneNumber = "";
    errors.flag = true;
  }

  return errors;
};

function App() {
  const [registerData, setRegisterData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    flag: true,
  });

  useEffect(() => {
    setErrors(validateSingIn(registerData));
  }, [registerData]);

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.flag) {
      alert("Registrado correctamente💙");

      // Redirigir al usuario después de 5 segundos

      window.location.href = "https://emaburgos.vercel.app/";
    }
  };

  return (
    <>
      <div>
        <h1 className="comida">Registrate 💻</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                autoComplete="on"
              />
              <p className={errors.name ? "success" : "error"}>
                {errors.name && errors.name}
              </p>
            </div>
            <div className="inputs">
              <label htmlFor="surname">Apellido</label>
              <input
                type="text"
                name="surname"
                onChange={handleChange}
                autoComplete="on"
              />
              <p className={errors.surname ? "success" : "error"}>
                {errors.surname && errors.surname}
              </p>
            </div>

            <div>
              <div className="inputs">
                <label htmlFor="phoneNumber">Telefono</label>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={handleChange}
                  autoComplete="on"
                />
                <p className={errors.phoneNumber ? "success" : "error"}>
                  {errors.phoneNumber && errors.phoneNumber}
                </p>
              </div>

              <div className="inputs">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  autoComplete="on"
                />
                <p className={errors.email ? "success" : "error"}>
                  {errors.email && errors.email}
                </p>
              </div>
            </div>
            <div>
              <div className="inputs">
                <label htmlFor="">Contraseña</label>
                <input name="password" onChange={handleChange} />
                <p className={errors.password ? "success" : "error"}>
                  {errors.password && errors.password}
                </p>
              </div>
              <div className="inputs">
                <label htmlFor="passwordRepeat">Repite tu contraseña</label>
                <input name="passwordRepeat" onChange={handleChange} />
                <p className={errors.passwordRepeat ? "success" : "error"}>
                  {errors.passwordRepeat && errors.passwordRepeat}
                </p>
              </div>
            </div>
            <div></div>
            <div>
              <button disabled={errors.flag}>Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
