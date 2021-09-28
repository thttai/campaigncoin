import web3 from "./web3";
import compiledCampaign from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    '0xC5E34ABaDb213D6692958bcF6712AB208c700ef1')

export default instance;
