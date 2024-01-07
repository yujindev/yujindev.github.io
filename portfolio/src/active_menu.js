// 구현계획
// 1.모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션 
// - 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택 : 현재 어디에 화면이 있는지 확인이 되어야함
// - 마지막 contact 섹션이 보여진다면, 그러면 가장 마지막 섹션을 선택

const sectionIds = ['#home','#about','#skills','#work','#testimonial','#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => document.querySelector(`[href="${id}"]`));
const visibleSections = sectionIds.map(()=>false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0,0.98],
};
const observer = new IntersectionObserver(observerCallback,options);
sections.forEach ((section) => observer.observe(section));

function observerCallback(entries) {
  let selectLastOne;//flag 변수
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne = 
    index === sectionIds.length -1 && 
    entry.isIntersecting && 
    entry.intersectionRatio >= 0.95;
  });

  const navIndex = selectLastOne
  ? sectionIds.length -1 
  : findFirstIntersecting(visibleSections);
  selectNavItem(navIndex);
}

function findFirstIntersecting(interSections) {
  const index = interSections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if(!navItem) return;
  activeNavItem.classList.remove('active');
  activeNavItem = navItem;
  activeNavItem.classList.add('active');
  
}