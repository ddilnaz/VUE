<template>
  <div>
    <h2>Statistics</h2>
    <button @click="goBack" class="back-button">← Back to Main Page</button>
    <div class="calendar-container">
      
      <label for="date">Select Date:</label>
      <input 
        type="date" 
        id="date" 
        v-model="selectedDate" 
      />
    </div>

    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

---

<script>
import { ref, onMounted, watch } from "vue";
import { Chart as ChartJS } from "chart.js/auto";
import { useRouter } from "vue-router";
import { reviews } from "@/reviews.js"; // Импорт данных reviews

export default {
  name: "Statistics",
  setup() {
    const chart = ref(null);
    const selectedDate = ref(""); // Выбранная дата
    const router = useRouter();
    // Функция извлечения всех дат из reviews
    const getAllDates = (reviews) => {
      let dates = [];
      reviews.forEach((category) => {
        Object.values(category).forEach((posts) => {
          posts.forEach((post) => {
            dates.push(post.date); // Используем полный формат даты-времени
          });
        });
      });
      return dates;
    };

    // Фильтрация записей по выбранной дате
    const filterDates = (dates, selectedDate) => {
      if (!selectedDate) return dates; // Если дата не выбрана, возвращаем все записи

      return dates.filter((date) => {
        const [fullDate] = date.split(" ");
        return fullDate === selectedDate.split("-").reverse().join("."); // Сравнение даты
      });
    };

    // Подсчет записей по датам
    const countPostsByDate = (dates) => {
      const counts = {};
      dates.forEach((date) => {
        const dateOnly = date.split(" ")[0];
        counts[dateOnly] = (counts[dateOnly] || 0) + 1;
      });
      return counts;
    };

    // Рендеринг графика с помощью ChartJS
    const renderChart = (filteredDates) => {
      const postCounts = countPostsByDate(filteredDates);

      // Данные для графика
      const labels = Object.keys(postCounts);
      const dataValues = Object.values(postCounts);

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Number of Posts",
            data: dataValues,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Posts",
            },
          },
          x: {
            title: {
              display: true,
              text: "Dates",
            },
          },
        },
      };

      // Удаление старого графика (если есть)
      if (chart.value) {
        chart.value.destroy();
      }

      // Создание нового графика
      chart.value = new ChartJS(document.getElementById("myChart"), {
        type: "bar",
        data: data,
        options: options,
      });
    };

    // Наблюдение за выбранной датой и обновление графика
    watch(selectedDate, () => {
      const allDates = getAllDates(reviews); // Все даты
      const filteredDates = filterDates(allDates, selectedDate.value); // Отфильтрованные даты
      renderChart(filteredDates); // Обновление графика
    });

    onMounted(() => {
      const allDates = getAllDates(reviews);
      renderChart(allDates); // Начальный рендеринг графика
    });
    const goBack = () => {
      router.push("/reviews"); // Переход на главную страницу
    };
    return {
      chart,
      selectedDate,
      goBack,
    };
  },
};
</script>

---

<style scoped>
/* Основной фон страницы */
div {
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  font-family: 'Arial', sans-serif;
  padding: 20px;
  height: 100vh; /* На всю высоту экрана */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Заголовок страницы */
h2 {
  color: #333;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
}

/* Контейнер для календаря */
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

label {
  font-size: 1.2rem;
  color: #333;
}

input[type="date"] {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="date"]:focus {
  border-color: #76c5e7;
}

/* Кнопка возврата */
.back-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button:hover {
  background-color: #45a049;
}

/* График */
canvas {
  width: 80% !important; /* Занимает 80% ширины экрана */
  height: 60vh; /* Занимает 60% высоты экрана */
  margin-top: 20px;
  background: white; /* Белый фон для контраста */
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
