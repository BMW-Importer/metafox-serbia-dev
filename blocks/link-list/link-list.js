export function toggleLinkListDetail(e) {
  const { target } = e;
  if (window.innerWidth < 768) {
    if (target.classList.contains('expand')) {
      target.nextSibling.style.maxHeight = null;
      target.classList.remove('expand');
    } else {
      target.nextSibling.style.maxHeight = `${target.nextSibling.scrollHeight}px`;
      target.classList.add('expand');
    }
  }
}

export function generateLinkListDom(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  const [linkListOrientation, linkListTitle, linkListDetail] = props;
  const orientationClassName = linkListOrientation.textContent || 'vertical';
  block.parentElement.classList.add(orientationClassName);

  const linkListTitleElem = document.createElement('h3');
  linkListTitleElem.classList.add('link-list-title');
  linkListTitleElem.textContent = linkListTitle.textContent;
  linkListTitleElem.addEventListener('click', toggleLinkListDetail);

  const linkListRTEElem = document.createElement('div');
  linkListRTEElem.classList.add('link-list-detail');
  linkListRTEElem.innerHTML = linkListDetail.innerHTML;

  return [linkListTitleElem, linkListRTEElem];
}

export default function decorate(block) {
  const [linkListTitleElem, linkListRTEElem] = generateLinkListDom(block);
  block.textContent = '';
  block.append(linkListTitleElem);
  block.append(linkListRTEElem);
}
