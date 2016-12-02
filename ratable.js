window.ratable = ( _ => {
  function view(original, opts){
    var div = document.createElement('div')
    div.className = 'ratablejs'
    for(let i = 0; i < 5; i++){
      var star = document.createElement('span')
      star.innerHTML = '&#9733;'
      star.style.color = opts.color || 'gold'
      star.setAttribute('data-index', 5 - i)
      star.addEventListener('click', function(e){
        onClick(e, original)
      })
      div.appendChild(star)
    }
    return div
  }
  function onClick(e, original){
    Array.from(e.target.parentNode.querySelectorAll('.active')).forEach(el=>{
      el.classList.remove('active')
    })
    e.target.classList.add('active')
    original.value = e.target.getAttribute('data-index')
  }
  var css = `
    .ratablejs{
      padding-left:0;
      cursor: pointer;
      display:inline-flex;
      flex-direction:row-reverse;
    }
    .ratablejs span{
      filter: grayscale(100%);
      padding:.5em;
    }
    .ratablejs span:last-of-type{
      padding-left:0;
    }
    .ratablejs span:hover,
    .ratablejs span.active{
      filter: grayscale(0%);
    }
    .ratablejs span:hover ~ span,
    .ratablejs span.active ~ span {
      filter: grayscale(0%);
    }
  `
  var style = document.createElement('style')
  style.innerHTML = css
  console.log(style)
  document.head.appendChild(style)
  function makeRatable(selector, opts){
    Array.from(document.querySelectorAll(selector)).forEach( el => {
      console.log(el)
      el.setAttribute('type','hidden')
      el.parentNode.insertBefore(view(el, opts),el)
    })
  }
  makeRatable('[data-ratable]')
  return makeRatable
})()