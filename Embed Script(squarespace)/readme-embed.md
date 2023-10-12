**REGARDING EMBEDS** 
mock-squarespace.html has a series of pairs: a section followed by a script tag. the script below a section refers to that section's functionality. 
The way I have things is by no means the best, it's just barely functional to show how to consume the API. 
We need to explore means to display changes live without page reloads(can be illusory via localstorage, as long as we are removing items from localstorage respective to the events that require them)

**just-posts.html** will have a post form and a rendered list of posts. 
- TODO: pagination, filter by topic, search.
- TODO: click the post to either change to post-comment view, or expand comment view and form below(check MVP and wireframes)

**login-register.html** will have the login and registration forms.
- this is currently dropped into the 'sign up' button's page '/join'
