// ── Elementos del DOM ──────────────────────────────────────────
const cityInput     = document.getElementById('city-input');
const searchBtn     = document.getElementById('search-btn');
const errorMsg      = document.getElementById('error-msg');
const errorText     = document.getElementById('error-text');
const emptyState    = document.getElementById('empty-state');
const loading       = document.getElementById('loading');
const weatherResult = document.getElementById('weather-result');

// ── Buscar al presionar Enter ───────────────────────────────────
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') buscarClima();
});

// ── Función principal ───────────────────────────────────────────
async function buscarClima() {
  const city = cityInput.value.trim();
  if (!city) return mostrarError('Por favor escribe una ciudad.');

  mostrarEstado('loading');

  try {
    const res  = await fetch(`/api/weather/forecast?city=${encodeURIComponent(city)}&days=3`);
    const data = await res.json();

    if (!res.ok) {
      mostrarError(data.error || 'No se pudo obtener el clima.');
      return;
    }

    renderClima(data);
    mostrarEstado('result');

  } catch (err) {
    mostrarError('Error de conexión con el servidor.');
  }
}

// ── Renderizar datos en el DOM ──────────────────────────────────
function renderClima(data) {
  const { location, current, forecast } = data;

  // Ubicación y tiempo
  document.getElementById('city-name').textContent   = location.name;
  document.getElementById('city-region').textContent = `${location.region}, ${location.country}`;

  const localtime = new Date(location.localtime.replace(' ', 'T'));
  document.getElementById('local-time').textContent = localtime.toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit'
  });
  document.getElementById('local-date').textContent = localtime.toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  // Temperatura y condición
  document.getElementById('temp-value').textContent     = Math.round(current.temp_c);
  document.getElementById('condition-text').textContent = current.condition.text;
  document.getElementById('feels-like').textContent     = `Sensación ${Math.round(current.feelslike_c)}°C`;
  document.getElementById('weather-icon').src           = 'https:' + current.condition.icon;
  document.getElementById('weather-icon').alt           = current.condition.text;

  // Stats
  document.getElementById('stat-humidity').textContent  = `${current.humidity}%`;
  document.getElementById('stat-wind').textContent      = `${current.wind_kph} km/h`;
  document.getElementById('stat-vis').textContent       = `${current.vis_km} km`;
  document.getElementById('stat-uv').textContent        = current.uv;
  document.getElementById('stat-pressure').textContent  = `${current.pressure_mb} hPa`;
  document.getElementById('stat-wind-dir').textContent  = current.wind_dir;

  // Pronóstico
  const forecastRow = document.getElementById('forecast-row');
  forecastRow.innerHTML = '';

  forecast.forecastday.forEach((day, i) => {
    const fecha = new Date(day.date + 'T12:00:00');
    const label = i === 0 ? 'Hoy'
                : i === 1 ? 'Mañana'
                : fecha.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' });

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <span class="forecast-day">${label}</span>
      <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="forecast-icon" />
      <span class="forecast-condition">${day.day.condition.text}</span>
      <div class="forecast-temps">
        <span class="forecast-max">${Math.round(day.day.maxtemp_c)}°</span>
        <span class="forecast-min">${Math.round(day.day.mintemp_c)}°</span>
      </div>
      <div class="forecast-extra">
        <span>💧 ${day.day.daily_chance_of_rain}%</span>
      </div>
    `;
    forecastRow.appendChild(card);
  });
}

// ── Helpers de estado ───────────────────────────────────────────
function mostrarEstado(estado) {
  emptyState.classList.add('hidden');
  loading.classList.add('hidden');
  weatherResult.classList.add('hidden');
  errorMsg.classList.add('hidden');

  if (estado === 'loading') loading.classList.remove('hidden');
  if (estado === 'result')  weatherResult.classList.remove('hidden');
}

function mostrarError(msg) {
  mostrarEstado('');
  emptyState.classList.remove('hidden');
  errorMsg.classList.remove('hidden');
  errorText.textContent = msg;
}


