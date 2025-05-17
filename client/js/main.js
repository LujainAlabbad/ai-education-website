document.addEventListener('DOMContentLoaded', () => {

  
  // ========== Load Popular Learning Paths ==========
  fetch('/api/paths')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('paths-list');
      container.innerHTML = '';
      data.forEach(path => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3>${path.title}</h3>
          <p>${path.description}</p>
          <a href="${path.link}" target="_blank">Visit</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Error fetching learning paths:', err);
      const container = document.getElementById('paths-list');
      container.innerHTML = '<p>Error loading learning paths.</p>';
    });

  // ========== Handle AI Demo ==========
  const askBtn = document.getElementById('get-answer');
  const questionBox = document.getElementById('demo-question');
  const answerBox = document.getElementById('demo-answer');

  if (askBtn && questionBox && answerBox) {
    askBtn.addEventListener('click', async function (e) {
      e.preventDefault();

      const question = questionBox.value.trim();
      if (!question) {
        answerBox.innerText = 'Please enter a question.';
        return;
      }
  

      answerBox.innerText = 'Thinking...';
    

      try {
        const res = await fetch('/api/demo/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question })
        });

        const data = await res.json();
        console.log("Response from backend:", data);

        answerBox.innerText = data.answer || data.msg || 'No answer received.';
      } catch (err) {
        console.error('Fetch error:', err);
        answerBox.innerText = 'Error fetching answer.';
      }
    });
  } else {
    console.warn('Demo elements not found in the DOM.');
  }

 document.getElementById('logout-btn')?.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    // Safely handle non-JSON responses
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    const data = isJson ? await res.json() : {};

    alert(data.msg || 'Logged out');
    window.location.href = '/login.html';
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Logout failed.');
  }
});
});