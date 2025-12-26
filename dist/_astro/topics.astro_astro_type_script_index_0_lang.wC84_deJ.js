class r{suggestButton=null;topicCards=null;constructor(){this.init()}init(){this.suggestButton=document.querySelector("[data-suggest-topic]"),this.topicCards=document.querySelectorAll('a[href^="/blog/category/"]'),this.suggestButton&&this.suggestButton.addEventListener("click",this.handleSuggestTopic.bind(this)),this.topicCards&&this.topicCards.forEach(t=>{t.addEventListener("click",this.handleTopicClick.bind(this))}),this.initAnimations()}handleSuggestTopic(){this.trackEvent("suggest_topic_click",{source:"topics_page",timestamp:new Date().toISOString()}),this.showTopicSuggestionModal()}handleTopicClick(t){const o=t.currentTarget.querySelector("h3")?.textContent||"Unknown";this.trackEvent("topic_selected",{topic:o.toLowerCase(),source:"topics_page",timestamp:new Date().toISOString()})}showTopicSuggestionModal(){const t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",t.addEventListener("click",a=>{a.target===t&&this.closeModal(t)});const e=document.createElement("div");e.className="bg-white dark:bg-surface-dark rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all",e.innerHTML=`
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Suggest a Topic</h3>
          <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-close-modal>
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form data-suggestion-form>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Topic Title
            </label>
            <input 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-dark text-gray-900 dark:text-white"
              placeholder="e.g., Advanced React Patterns"
              required
              data-topic-title
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-dark text-gray-900 dark:text-white"
              rows="3"
              placeholder="Tell us more about what you'd like to learn..."
              data-topic-description
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email (Optional)
            </label>
            <input 
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-dark text-gray-900 dark:text-white"
              placeholder="your@email.com"
              data-user-email
            />
          </div>
          
          <div class="flex gap-3">
            <button 
              type="submit"
              class="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Submit Suggestion
            </button>
            <button 
              type="button"
              class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              data-close-modal
            >
              Cancel
            </button>
          </div>
        </form>
      `,t.appendChild(e),document.body.appendChild(t),e.querySelectorAll("[data-close-modal]").forEach(a=>{a.addEventListener("click",()=>this.closeModal(t))}),e.querySelector("[data-suggestion-form]").addEventListener("submit",a=>this.handleSuggestionSubmit(a,t));const i=e.querySelector("input");setTimeout(()=>i?.focus(),100)}async handleSuggestionSubmit(t,e){t.preventDefault();const o=t.target;new FormData(o);const s=o.querySelector("[data-topic-title]").value,i=o.querySelector("[data-topic-description]").value,a=o.querySelector("[data-user-email]").value;this.trackEvent("topic_suggestion_submitted",{title:s,has_description:!!i,has_email:!!a,timestamp:new Date().toISOString()});try{await this.submitTopicSuggestion({title:s,description:i,email:a}),this.showNotification("Thank you for your suggestion! We'll consider it for future articles.","success"),this.closeModal(e)}catch(n){console.error("Error submitting suggestion:",n),this.showNotification("Sorry, there was an error submitting your suggestion. Please try again.","error")}}async submitTopicSuggestion(t){await new Promise(e=>setTimeout(e,1e3))}closeModal(t){t.classList.add("opacity-0"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},200)}initAnimations(){document.querySelectorAll('a[href^="/blog/category/"]').forEach((e,o)=>{e.style.animationDelay=`${o*100}ms`,e.classList.add("animate-fade-in-up")})}trackEvent(t,e){console.log("Event tracked:",t,e),typeof gtag<"u"&&gtag("event",t,e)}showNotification(t,e){const o=document.createElement("div");o.className=`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${e==="success"?"bg-green-500 text-white":e==="error"?"bg-red-500 text-white":"bg-blue-500 text-white"}`,o.textContent=t,document.body.appendChild(o),setTimeout(()=>{o.classList.remove("translate-x-full")},100),setTimeout(()=>{o.classList.add("translate-x-full"),setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},300)},4e3)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{new r}):new r;
