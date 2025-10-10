const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>
                            <div class="data">
                                <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                                <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                                
                                <p>👥 <strong>${user.followers}</strong> seguidores</p>
                                <p>🔍 <strong>${user.following}</strong> seguindo</p>
                                
                                <p>@${user.userName}</p>
                            </div>
                        </div>`;
    
    this.renderRepositories(user.repositories);
    this.renderEvents(user.events);
  },

    renderRepositories(repositories) {
    if (Array.isArray(repositories) && repositories.length > 0) {      
      let repositoriesItens = '';
      repositories.forEach(repo => {
        repositoriesItens += `
          <li>
            <div>
              <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
              <div>
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                <span>👀 ${repo.watchers_count}</span>
              </div>
            </div>
           ${repo.language ? `<span"${repo.language}">👩‍💻 ${repo.language}</span>` : ''}
          </li>
        `;
      });

        this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItens}</ul>
                                       </div>`;
    }
  },

  renderEvents(events) {
    if(Array.isArray(events) && events.length > 0) {
      let eventsItens = '';
      
      events.forEach(event => {
       const repoName = event.repo?.name || 'Repositório desconhecido';
        const commitMessage = event.payload?.commits?.[0]?.message ?? 'Sem mensagem de commit';
        
        if (event.type === 'PushEvent' || event.type === 'CreateEvent') {
          eventsItens += `<li>
                             <strong>${repoName}</strong> - ${commitMessage}
                           </li>`
        }
      })

      this.userProfile.innerHTML += `<div class="events section">
                                        <h2>Eventos</h2>
                                        <ul>${eventsItens}</ul>
                                     </div>`;
    }
  },

  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  }
};

export { screen }