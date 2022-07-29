import React, { useState, useEffect } from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: ""
}

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = () => {
  const [form, setform] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progess, setProgress] = useState(null);

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot => {
      const progress = (snapshot.BytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progess);
      switch (snapshot.state) {
        case "paused":
          console.log("upload is paused");
          break;
        case "running":
          console.log("upload is paused");
          break;
        default:
          break;
      }
    }, (error) => {
      console.log(error)
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setform((prev) => ({ ...prev, imgUrl: downloadUrl }))
        })
      }
    ))
    file && uploadFile();
  }, [file]);

  console.log("form", form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = () => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = () => {
    setForm({ ...form, category: e.target.value })
  };
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text center heading py-2">
            Create Blog
          </div>
        </div>
        <div className="row h-100 justify-content center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form">
              <div className="col-12 py-3">
                <input type="text"
                  classname='form-control input-text-box'
                  placeholder='Title'
                  name="title"
                  value={title}
                  onChange={handleChange} />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags} />
              </div>
              <div className="col-12 py-3">
                <p className="trending">
                  is it trending blog?
                </p>
                <div className="form-check-inline mx-2">
                  <input type="radio"
                    classname="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending} />
                  <label htmlFor="radioOption" className="form-check-label">yes&nbsp;</label>
                  <input type="radio"
                    classname="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending} />
                  <label htmlFor="radioOption" className="form-check-label">No</label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  classname="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <div className="col-12 py-3 text-center">
                <button className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progess < 100}>
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



  );
};

export default AddEditBlog;