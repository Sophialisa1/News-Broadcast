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
  const [news, setNews] = useState([]);

  // create a tab in form of navigation

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
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(Media, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const getMedia = useCallback(async () => {
    const newsLength = await contract.methods.getMediaLength().call();
    const news = [];
    for (let index = 0; index < newsLength; index++) {
      let _news = new Promise(async (resolve, reject) => {
        let news = await contract.methods.getMedia(index).call();

        resolve({
          index: index,
          owner: news[0],
          author: news[1],
          title: news[2],
          categories: news[3],
          image: news[4],
          newsContent: news[5],
          price: news[6],
          sold: news[7],
        });
      });
      news.push(_news);
    }

    const _news = await Promise.all(news);
    setNews(news);
    console.log(_news);
  }, [contract]);

  // console.log(news);

  const uploadMedia = async (
    _author,
    _title,
    _categories,
    _image,
    _newsContent,
    _price
  ) => {
    let price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .uploadMedia(_author, _title, _categories, _image, _newsContent, price)
        .send({ from: address });
      getMedia();
    } catch (error) {
      alert(error);
    }
  };

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
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
      const cost = news[_index].price;
      await cUSDContract.methods
        .approve(contractAddress, cost)
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

  useEffect(() => {
    if (contract) {
      getMedia();
    }
  }, [contract, getMedia]);

  const [showTab, setShowTab] = useState(1);
  return (
    <div className="App">
      <NavigationBar cUSDBalance={cUSDBalance} setShowTab={setShowTab} />
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

        {/* <!-- UPLOAD NEWS FORM --> */}
        <UploadMedia uploadMedia={uploadMedia} showTab={showTab} />

        {/* <!-- ENDS HERE --> */}

        {/* <!-- DISPLAY NEWS --> */}

        <DisplayMedia
          showTab={showTab}
          // buyNews={buyNews}
          // walletAddress={address}
          // updatePrice={updatePrice}
          // removeMedia={removeMedia}
          // editNewsContent={editNewsContent}
        />
        {/* <!-- ENDS HERE --> */}
      </div>
    </div>
  );
}

export default App;
