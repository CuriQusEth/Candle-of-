/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Web3Provider } from './components/providers/Web3Provider';
import { GameLayout } from './components/ui/GameLayout';

export default function App() {
  return (
    <Web3Provider>
      <GameLayout />
    </Web3Provider>
  );
}
