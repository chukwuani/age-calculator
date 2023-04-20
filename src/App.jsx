import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const Today = new Date();
  const currentYear = Today.getFullYear();
  const currentMonth = Today.getMonth();
  const currentDay = Today.getDate();

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const [Year, setYear] = useState("");
  const [Month, setMonth] = useState("");
  const [Day, setDay] = useState("");

  const [YearError, setYearError] = useState(false);
  const [MonthError, setMonthError] = useState(false);
  const [DayError, setDayError] = useState(false);

  const [WrongYear, setWrongYear] = useState(false);
  const [WrongMonth, setWrongMonth] = useState(false);
  const [WrongDay, setWrongDay] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const LeapYear = (currentYear - 2000) % 4 === 0;
    let Days = 31;
    let Months = Number(birthMonth);

    switch (Months) {
      case 2:
        LeapYear ? (Days = 29) : (Days = 28);
        break;

      case 4:
        Days = 30;
        break;

      case 6:
        Days = 30;
        break;

      case 9:
        Days = 30;
        break;

      case 11:
        Days = 30;
        break;
    }

    if (birthYear === "") {
      setYear("");
      setMonth("");
      setDay("");
      setYearError(true);
      setTimeout(() => {
        setYearError(false);
      }, 2500);
    }

    if (birthMonth === "") {
      setYear("");
      setMonth("");
      setDay("");
      setMonthError(true);
      setTimeout(() => {
        setMonthError(false);
      }, 2500);
    }

    if (birthDay === "") {
      setYear("");
      setMonth("");
      setDay("");
      setDayError(true);
      setTimeout(() => {
        setDayError(false);
      }, 2500);
    }

    if (birthYear > currentYear) {
      setWrongYear(true);
      setYear("");
      setMonth("");
      setDay("");
      setYearError(true);
      setTimeout(() => {
        setYearError(false);
      }, 2500);
    }

    if (birthMonth > 12) {
      setWrongMonth(true);
      setYear("");
      setMonth("");
      setDay("");
      setMonthError(true);
      setTimeout(() => {
        setMonthError(false);
      }, 2500);
    }

    if (birthDay > Days) {
      setWrongDay(true);
      setYear("");
      setMonth("");
      setDay("");
      setDayError(true);
      setTimeout(() => {
        setDayError(false);
      }, 2500);
    }

    if (
      birthYear !== "" &&
      birthMonth !== "" &&
      birthDay !== "" &&
      birthYear <= currentYear &&
      birthMonth <= 12 &&
      birthDay <= Days
    )
      calculateAge();
  }

  function calculateAge() {
    let years = currentYear - birthYear;
    let months = currentMonth + 1 - birthMonth;
    let days = currentDay - birthDay;

    if (days < 0) {
      months -= 1;
      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
      days += daysInPrevMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years < 0) {
      years = "";
      months = "";
      days = "";

      setWrongMonth(true);
      setMonthError(true);
      setTimeout(() => {
        setMonthError(false);
      }, 2500);
    }

    setYear(years);
    setMonth(months);
    setDay(days);
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form onSubmit={(e) => handleSubmit(e)}>
          <span className={DayError === true ? "error" : ""}>
            <label htmlFor="day">Day</label>
            <input
              type="number"
              name="day"
              id="day"
              aria-label="Input for Day"
              placeholder="DD"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            />
            <label className="error-msg" htmlFor="day">
              {(birthDay === "" && "This field is required") ||
                (WrongDay === true && " Must be a valid day ") ||
                "This field is required"}
            </label>
          </span>

          <span className={MonthError === true ? "error" : ""}>
            <label htmlFor="month">Month</label>
            <input
              type="number"
              name="month"
              id="month"
              aria-label="Input for Month"
              placeholder="MM"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            />
            <label className="error-msg" htmlFor="month">
              {(birthMonth === "" && "This field is required") ||
                (WrongMonth === true && "Must be a valid month") ||
                "This field is required"}
            </label>
          </span>

          <span className={YearError === true ? "error" : ""}>
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              aria-label="Input for Year"
              placeholder="YYYY"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
            <label className="error-msg" htmlFor="year">
              {(birthYear === "" && "This field is required") ||
                (WrongYear === true && " Must be in the past ") ||
                "This field is required"}
            </label>
          </span>

          <button>
            <img src="/images/icon-arrow.svg" alt="" aria-roledescription="Presentation" />
          </button>
        </form>
      </div>

      <div className="age-display">
        <h1>
          <span className="dash">{Year === "" ? "--" : Year} </span>years
        </h1>

        <h1>
          <span className="dash">{Month === "" ? "--" : Month}</span> months
        </h1>

        <h1>
          <span className="dash">{Day === "" ? "--" : Day}</span> days
        </h1>
      </div>
    </div>
  );
}
