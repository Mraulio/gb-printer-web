import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

const functionLabels = {
  testFile: 'Print test image',
  checkPrinter: 'Check Printer',
  fetchImages: null,
  clearPrinter: 'Clear Printer',
  tear: 'Tear',
};

const getFetchImagesLabel = (printerFunctions, dumpsLength) => {
  if (printerFunctions.includes('tear')) {
    return 'Fetch images';
  }

  return `Fetch ${dumpsLength || 0} images`;
};

const PrinterReport = ({
  printerData,
  printerFunctions,
  printerConnected,
  callRemoteFunction,
  printerBusy,
}) => {

  if (!printerConnected) {
    return null;
  }

  return (
    <div className="printer-report">
      <div className="inputgroup buttongroup">
        {printerFunctions.map((name) => (
          <button
            key={name}
            type="button"
            className="button"
            disabled={
              printerBusy ||
              (
                ['fetchImages', 'clearPrinter', 'tear'].includes(name) &&
                !printerData.dumps?.length
              )
            }
            onClick={() => callRemoteFunction(name)}
          >
            {
              name === 'fetchImages' ?
                getFetchImagesLabel(printerFunctions, printerData.dumps?.length) :
                functionLabels[name]
            }
          </button>
        ))}
      </div>

      {
        (printerData?.fs && printerData?.dumps) ? (
          <table className="printer-report__table">
            <thead>
              <tr>
                <th className="printer-report__label printer-report__head">Printer Filesystem</th>
                <th className="printer-report__value printer-report__head printer-report__value--url" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="printer-report__label">Total</td>
                <td className="printer-report__value">{filesize(printerData.fs.total)}</td>
              </tr>
              <tr>
                <td className="printer-report__label">Used</td>
                <td className="printer-report__value">{filesize(printerData.fs.used)}</td>
              </tr>
              <tr>
                <td className="printer-report__label">Free</td>
                <td className="printer-report__value">
                  {`${Math.max(0, (printerData.fs.maximages - printerData.dumps.length))} images`}
                </td>
              </tr>
              <tr>
                <td className="printer-report__label">Images</td>
                <td className="printer-report__value">{printerData.dumps.length}</td>
              </tr>
            </tbody>
          </table>
        ) : null
      }
      {
        (printerData?.message) ? (
          <p className="printer-report__message">
            { printerData?.message }
          </p>
        ) : null
      }
    </div>
  );
};

PrinterReport.propTypes = {
  printerData: PropTypes.object.isRequired,
  printerBusy: PropTypes.bool.isRequired,
  printerFunctions: PropTypes.array.isRequired,
  printerConnected: PropTypes.bool.isRequired,
  callRemoteFunction: PropTypes.func.isRequired,
};

export default PrinterReport;
