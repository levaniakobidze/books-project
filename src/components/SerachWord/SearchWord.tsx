import React, { Fragment } from "react";

function SearchWor() {
  return (
    <Fragment>
      <div
        className=" mt-10 w-full"
        style={{
          width: "100%",
          // height: " 80px",
          borderColor: "#ff0000",
          borderWidth: "1",
          // background:
          //   "url('https://www.oxfordlearnersdictionaries.com/external/images/widget_old/widget160.png?version=2.3.48')",
          // backgroundRepeat: "no-repeat",
        }}>
        <h1 className="text-center mt-10 font-bold text-2xl bg-blue-400 p-5 text-white">
          მოძებნე სიტყვა ოქსფორდის ლექსიკონში
        </h1>
        <form
          action="https://www.oxfordlearnersdictionaries.com/search/english/direct/"
          method="get"
          name="oldform"
          id="oldform"
          className="w-full">
          <div className="max-w-md mx-3 sm:mx-auto mt-5  flex  justify-between items-center w-[100%] bg-white rounded-lg p-3 shadow-gray-400 shadow-sm">
            <input
              type="text"
              name="q"
              id="searchfield"
              // size={"21"}
              // maxlength="100"
              placeholder="ჩაწერე სიტყვა"
              className="flex-1 p-3 border-0 outline-0"
            />
            <div className="flex">
              <div className="flex justify-center">
                <input
                  className="bg-blue-400 text-white font-bold tracking-wider px-[15px] py-[10px] rounded-lg cursor-pointer"
                  type="submit"
                  id="search-btn160"
                  value={"ძებნა"}
                />
              </div>
              <div className="w-[100px]">
                <select
                  className=" w-[100px] px-[15px] py-[13px] outline-0 cursor-pointer text-white bg-blue-400 mx-2 rounded-lg"
                  //   onchange={() => (this.form.action = this.value)}
                >
                  <option value="https://www.oxfordlearnersdictionaries.com/search/english/direct/">
                    ინგლისური
                  </option>
                  <option value="https://www.oxfordlearnersdictionaries.com/search/american_english/direct/">
                    ამერიკული ინგლისური
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SearchWor;
