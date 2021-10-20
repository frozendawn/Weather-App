import styles from './CurrentWeather.module.css';


const CurrentWeather = (props) => {


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    const date = `${today.getDate()}  ${months[today.getMonth()]}  ${today.getFullYear()}`


  return (
    <div>
      <div className={styles["title-container"]}>
        {props.city.name ? props.city.name : "New York"}
      </div>
      <div className={styles["conditions-container"]}>
        {props.city.weather ? props.city.description : "mostly sunny"}
      </div>
      <div className={styles["degree-container"]}>
        {props.city.degrees ? props.city.degrees : "29°"}
      </div>
      <div className={styles["date-container"]}>{date}</div>
    </div>
  );
};

export default CurrentWeather;
