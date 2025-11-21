Answers for Iteration 8
>1. Virtual Field in Backend (jobSchema.set("toJSON", ...))
```
jobSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

```
Explanation: The snippet showsa clear id field then mongo's _id when converting to json, this makes frontend easy and simple to use while preventing duplication.

>2. CORS Middleware (app.use(cors()))
```
 app.use(cors());
```
Explaination: Cors let the frontend to communicate with bankend without browser blocking request, it is needed in few cases when ports differs

>3. Frontend Proxy Configuration (vite.config.js)
```
proxy: {
  "/api": {
    target: "http://localhost:4000",
    changeOrigin: true,
  },
},

```

Explaination: The proxy sends any api request from vite dev server to backend,to avoid cors issues and simple Api path. 
