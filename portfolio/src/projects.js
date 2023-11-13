'use strict';

// 프로젝트 필터링 관련 로직 처리
const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');
categories.addEventListener('click',(event)=>{
  const filter = event.target.dataset.category;
  if(filter == null) {
    return;
  }
  handleActiveSelection(event.target);
  filterProjects(filter);
  });

  function handleActiveSelection(target){
    const active = document.querySelector('.category--selected');
    active.classList.remove('category--selected');
    target.classList.add('category--selected');
  }
  
  function filterProjects(filter) {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === 'all' || filter === project.dataset.type){
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
    projectsContainer.classList.add('anim-out');
    setTimeout(() => {
      projectsContainer.classList.remove('anim-out');
    },250);
  }