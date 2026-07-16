function downloadAndShare(url) {
  console.log('开始下载:', url);
  wx.showLoading({ title: '下载中...', mask: true });

  wx.downloadFile({
    url: url,
    success(res) {
      wx.hideLoading();
      if (res.statusCode === 200) {
        const tempFilePath = res.tempFilePath;
        const fileManager = wx.getFileSystemManager();

        // 保存到本地（持久化）
        fileManager.saveFile({
          tempFilePath: tempFilePath,
          success(saveRes) {
            console.log('文件保存成功:', saveRes.savedFilePath);
            // 直接打开文档
            wx.openDocument({
              filePath: saveRes.savedFilePath,
              success() {
                wx.showToast({ title: '打开成功', icon: 'success' });
              },
              fail(err) {
                console.error('打开文档失败:', err);
                wx.showToast({ title: '打开失败，请重试', icon: 'none' });
              }
            });
          },
          fail(err) {
            console.error('保存文件失败:', err);
            // 降级：直接打开临时文件
            wx.openDocument({
              filePath: tempFilePath,
              success() {
                wx.showToast({ title: '打开成功（临时）', icon: 'success' });
              },
              fail() {
                wx.showToast({ title: '文件打开失败', icon: 'none' });
              }
            });
          }
        });
      } else {
        wx.showToast({ title: '下载失败（状态码:' + res.statusCode + ')', icon: 'none' });
      }
    },
    fail(err) {
      wx.hideLoading();
      console.error('下载失败:', err);
      wx.showToast({ title: '下载失败：' + err.errMsg, icon: 'none' });
    }
  });
}

module.exports = { downloadAndShare };

// function downloadAndShare(url, fileName = '') {
//   console.log('开始下载:', url);
//   wx.showLoading({ title: '下载中...', mask: true });

//   wx.downloadFile({
//     url: url,
//     success(res) {
//       console.log('下载成功，状态码:', res.statusCode);
//       wx.hideLoading();
//       if (res.statusCode === 200) {
//         const tempFilePath = res.tempFilePath;
//         const fileManager = wx.getFileSystemManager();

//         // 尝试保存到本地（持久化）
//         fileManager.saveFile({
//           tempFilePath: tempFilePath,
//           success(saveRes) {
//             console.log('文件保存成功，路径:', saveRes.savedFilePath);
//             const savedFilePath = saveRes.savedFilePath;

//             // 显示操作菜单
//             wx.showModal({
//               title: '下载完成',
//               content: '是否分享给好友？',
//               confirmText: '分享',
//               cancelText: '保存到本地',
//               success(modalRes) {
//                 if (modalRes.confirm) {
//                   // 用户选择分享
//                   if (wx.shareFileMessage) {
//                     wx.shareFileMessage({
//                       filePath: savedFilePath,
//                       success() {
//                         console.log('分享成功');
//                       },
//                       fail(err) {
//                         console.error('分享失败:', err);
//                         // 分享失败，尝试打开文档让用户手动转发
//                         wx.openDocument({
//                           filePath: savedFilePath,
//                           success() {
//                             wx.showToast({ title: '已打开，可转发', icon: 'success' });
//                           },
//                           fail() {
//                             wx.showToast({ title: '分享失败，已保存到本地', icon: 'none' });
//                           }
//                         });
//                       }
//                     });
//                   } else {
//                     // 旧版本微信不支持 shareFileMessage，直接打开文档
//                     wx.openDocument({
//                       filePath: savedFilePath,
//                       success() {
//                         wx.showToast({ title: '打开成功，可转发', icon: 'success' });
//                       },
//                       fail() {
//                         wx.showToast({ title: '打开失败，已保存到本地', icon: 'none' });
//                       }
//                     });
//                   }
//                 } else {
//                   wx.showToast({ title: '已保存到本地', icon: 'success' });
//                 }
//               },
//               fail(err) {
//                 console.error('Modal 显示失败:', err);
//                 // 仍然打开文档作为备用
//                 wx.openDocument({
//                   filePath: savedFilePath,
//                   success() { wx.showToast({ title: '已保存，可转发', icon: 'success' }); },
//                   fail() { wx.showToast({ title: '保存成功但打开失败', icon: 'none' }); }
//                 });
//               }
//             });
//           },
//           fail(err) {
//             console.error('保存文件失败:', err);
//             // 保存失败，降级：直接打开临时文件
//             wx.openDocument({
//               filePath: tempFilePath,
//               success() {
//                 wx.showToast({ title: '打开成功（临时文件）', icon: 'success' });
//               },
//               fail() {
//                 wx.showToast({ title: '文件保存失败，请重试', icon: 'none' });
//               }
//             });
//           }
//         });
//       } else {
//         wx.showToast({ title: '下载失败（状态码:' + res.statusCode + ')', icon: 'none' });
//       }
//     },
//     fail(err) {
//       wx.hideLoading();
//       console.error('下载失败:', err);
//       wx.showToast({ title: '下载失败：' + err.errMsg, icon: 'none' });
//     }
//   });
// }

// module.exports = { downloadAndShare };
