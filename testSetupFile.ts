import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
import 'jest-canvas-mock'

require('dotenv').config()
global.fetch = require("node-fetch");

Enzyme.configure({ adapter: new Adapter() });

//@ts-ignore
expect.addSnapshotSerializer(createSerializer({ mode: 'deep', noKey: true }));

const noScroll = () => {};
Object.defineProperty( window, 'scrollTo', { value: noScroll, writable: true } );
