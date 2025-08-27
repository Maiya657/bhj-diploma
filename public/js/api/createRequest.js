const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
	let url = options.url;
	let method = options.method;
	let data;
	let formData;
  let searchParams;

  if (options.data) {
    data = Object.entries(options.data);
  }

	if (method === 'GET') {
    if (data) {
      searchParams = new URLSearchParams()
      for ([key, value] of data) {
        searchParams.append(key, value);
      }
      url = `${url}?${searchParams.toString()}`
    }
    
	} else if (data) {
		formData = new FormData();    
		for ([key, value] of data) {
			formData.append(key, value);
		}
	}

  xhr.responseType = 'json';

  xhr.open(method, url);
  xhr.addEventListener('load', () => {
    if (xhr.response.success) {
      options.callback(null, xhr.response);
    } else {
      options.callback(xhr.response.error, null);
    }
  });

  try {
    xhr.send(formData); 
  } catch (error) {
    options.callback(error, null);
  }
};