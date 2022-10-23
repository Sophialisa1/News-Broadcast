import "./App.css";

import { NavigationBar } from "./components/nav";
import { UploadMedia } from "./components/uploadMedia";
import { DisplayMedia } from "./components/displayMedia";
import { useState, useEffect, useCallback } from "react";

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import Media from "./contracts/Media.abi.json";
import IERC from "./contracts/IERC.abi.json";

const ERC20_DECIMALS = 18;

const contractAddress = "0x34f2e58eB2FA05FE7fa82da8C5068144Ba7a7cA5";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];
        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Error Occurred");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      setLoadingNews(true);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      console.log("hi");

      const contract = new kit.web3.eth.Contract(Media, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const updatePrice = async (_index, _price) => {
    const price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods.updatePrice(_index, price).send({ from: address });
      getMedia();
      alert("you have successfully updated the price");
    } catch (error) {
      alert(error);
    }
  };

  const editNewsContent = async (_index, _newsContent) => {
    try {
      await contract.methods
        .editNewsContent(_index, _newsContent)
        .send({ from: address });
      getMedia();
      alert("you have successfully edited the content of these media");
    } catch (error) {
      alert(error);
    }
  };

  const removeMedia = async (_index) => {
    try {
      await contract.methods.removeMedia(_index).send({ from: address });
      getMedia();
    } catch (error) {
      alert(error);
    }
  };

  const buyNews = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    try {
      await cUSDContract.methods
        .approve(contractAddress, newsList[_index].price)
        .send({ from: address });
      await contract.methods.buyNews(_index).send({ from: address });
      getMedia();
      getBalance();
      alert("you have successfully purchased this news");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  const getMedia = useCallback(async () => {
    const mediaLength = await contract.methods.getMediaLength().call();
    // console.log(mediaLength);
    setLoadingNews(true);
    const medias = [];
    for (let index = 0; index < mediaLength; index++) {
      let _medias = new Promise(async (resolve, reject) => {
        let media = await contract.methods.getMedia(index).call();

        resolve({
          index: index,
          owner: media[0],
          author: media[1],
          title: media[2],
          categories: media[3],
          image: media[4],
          newsContent: media[5],
          price: media[6],
          sold: media[7],
        });
      });
      medias.push(_medias);
    }

    const _medias = await Promise.all(medias);

    setLoadingNews(false);
    setNewsList(_medias);
  }, [contract]);
  useEffect(() => {
    if (contract) {
      getMedia();
    }
  }, [contract, getMedia]);

  const uploadMedia = async (
    _author,
    _title,
    _categories,
    _image,
    _newsContent,
    _price
  ) => {
    try {
      let price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
      await contract.methods
        .uploadMedia(_author, _title, _categories, _image, _newsContent, price)
        .send({ from: address });
      getMedia();
    } catch (error) {
      alert(error);
    }
  };

  // create a tab in form of navigation
  const [showTab, setShowTab] = useState(3);
  return (
    <div className="App">
      <NavigationBar
        cUSDBalance={cUSDBalance}
        showTab={showTab}
        setShowTab={setShowTab}
      />
      <div className="container">
        <header className={`show-flex ${showTab === 1 ? null : "hide"}`}>
          <section className="header-content">
            <div>
              <h1>
                Buy news and upload your news for sale to
                <span>Intrested persons</span>
              </h1>
              <p>
                This is a medium where we sell trending and current news to
                users for their daily consumption, we offer diffrent categories
                of news ranging from Sports, World News, Eductaion, Trading,
                e.t.c
              </p>
            </div>
          </section>

          <section className="header-btn">
            <button
              className="header-upload-news-btn show"
              onClick={() => {
                setShowTab(2);
              }}
            >
              Upload news
            </button>
            <button
              className="header-review-news-btn show"
              onClick={() => {
                setShowTab(3);
              }}
            >
              Buy news
            </button>
          </section>
        </header>

        <div className={`show-flex ${showTab === 2 ? null : "hide"}`}>
          {" "}
          {/* <!-- UPLOAD NEWS FORM --> */}
          <UploadMedia uploadMedia={uploadMedia} showTab={showTab} />
          {/* <!-- ENDS HERE --> */}
        </div>

        <div
          className={`show-flex  ${showTab === 3 ? null : "hide"}`}
          style={{ flexDirection: "row" }}
        >
          {" "}
          {/* <!-- DISPLAY NEWS --> */}
          {loadingNews ? (
            <div className="d-flex justify-content-center fs-1 h-100 w-100 my-auto">
              Loading News...
            </div>
          ) : (
            <>
              {newsList.map((news, i) => {
                return (
                  <DisplayMedia
                    key={i}
                    editNewsContent={editNewsContent}
                    removeMedia={removeMedia}
                    buyNews={buyNews}
                    showTab={showTab}
                    news={news}
                    updatePrice={updatePrice}
                  />
                );
              })}
            </>
          )}
          {/* <!-- ENDS HERE --> */}
        </div>
      </div>
    </div>
  );
}

export default App;
