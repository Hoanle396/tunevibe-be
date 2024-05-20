import {
  MarketplaceAddress,
  NFTAddress,
  PRIVATE_KEY,
  RPC_URL,
} from '@/utils/constants';
import { ethers } from 'ethers';
import { NFTabi } from './MusicTuneVibe.sol/abi';
import { Marketabi } from './TuneVibe.sol/abi';

export const getContract =  (type: 'market' | 'nft' = 'market') => {
  try {
    console.log({ PRIVATE_KEY, RPC_URL });

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      type == 'market' ? MarketplaceAddress : NFTAddress,
      type == 'market' ? Marketabi : NFTabi,
      signer
    );
   
    return contract;
  } catch (err) {
    console.log({ err });
  }
};
