// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Newsmedia {

    uint internal newsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;


    struct Media {
        address payable owner;
        string author;
        string title;
        string categories;
        string image;
        string newsContent;
        uint price;
        uint sold;
    }

    mapping (uint => Media) private news;

        modifier onlyOwner(uint _index) {
        require(msg.sender == news[_index].owner, "Only Owner");
        _;
    }


    /// @dev carring out the function will add a new media to the mapping
    function uploadMedia(
        string calldata _author,
        string calldata _title,
        string calldata _categories,
        string calldata _image,
        string calldata _newsContent,  
        uint _price
    ) public {
        require(bytes(_author).length > 0, "Empty author");
        require(bytes(_title).length > 0, "Empty title");
        require(bytes(_categories).length > 0, "Empty categories");
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_newsContent).length > 0, "Empty news content");
        uint _sold = 0;
        news[newsLength] = Media(
            payable(msg.sender),
            _author,
            _title,
            _categories,
            _image,
            _newsContent,
            _price,
            _sold
        );
        newsLength++;
    }

/// @return data of a news coverage 
    function getMedia(uint _index) public view returns (
        address payable,
        string memory, 
        string memory,  
        string memory,
        string memory,
        string memory,
        uint,
        uint
    ) {
        Media memory n = news[_index];
        return (

            n.owner,
            n.author, 
            n.title,
            n.categories,
            n.image,
            n.newsContent, 
            n.price,
            n.sold
           
        );
    }



    /// @dev remove news from catalog
    function removeMedia(uint _index) external onlyOwner(_index) {  
            uint newNewsLength = newsLength - 1;     
            news[_index] = news[newNewsLength];
            delete news[newNewsLength];
            newsLength = newNewsLength; 
	 }

    /**
        * @dev allow an author to change the price of his news article
     */
    function updatePrice(uint _index, uint price) public onlyOwner(_index)  {
            news[_index].price = price;
    }


    /**
        * @dev allow an author to edit the content of his news coverage
     */
    function editNewsContent(uint _index, string calldata _content) public  onlyOwner(_index) {
        news[_index].newsContent = _content;
    }

    /**
        * @dev allow readers to buy and view an article/news
     */
    function buyNews(uint _index) public payable  {
        Media storage currentNews = news[_index];
        require(currentNews.owner != msg.sender, "Author can't buy his news coverage");
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            currentNews.owner,
            currentNews.price
          ),
          "Transfer failed."
        );
        currentNews.sold++;
    }

    
    function getMediaLength() public view returns (uint) {
        return (newsLength);
    }
    }
