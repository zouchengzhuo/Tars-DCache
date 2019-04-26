/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

console.log('tars-dcache');
console.log('__dirname', __dirname);
console.log('cwd', process.cwd());
console.log('__filename', __filename);

const cwd = process.cwd();
const path = require('path');

const RegionController = require('./region/controller.js');
const ApplyController = require('./apply/controller.js');
const ModuleController = require('./module/controller.js');
const ModuleConfigController = require('./moduleConfig/controller.js');
const ServerConfigController = require('./serverConfig/controller.js');
const ProxyController = require('./proxy/controller.js');
const RouterController = require('./router/controller.js');
const ModuleOperation = require('./moduleOperation/controller');

const {
  getConfig,
  addConfig,
  deleteConfig,
  editConfig,
  getModuleConfig,
  getServerConfig,
  getServerNodeConfig,
  addServerConfigItem,
  deleteServerConfigItem,
  updateServerConfigItem,
  updateServerConfigItemBatch,
  deleteServerConfigItemBatch,
} = require('./config/controller.js');


const { apiConf } = require(path.join(cwd, './app/router/routerConf.js'));

const dcacheApiConf = [

  // 地区
  ['get', '/get_region_list', RegionController.getRegionList],
  ['post', '/add_region', RegionController.addRegion],
  ['get', '/delete_region', RegionController.deleteRegion],
  ['post', '/update_region', RegionController.updateRegion],

  // 应用
  ['post', '/add_apply', ApplyController.addApply],
  ['get', '/get_apply_and_router_and_proxy', ApplyController.getApplyAndRouterAndProxy],
  ['post', '/save_router_proxy', ApplyController.saveRouterProxy],
  ['get', '/get_apply_list', ApplyController.getApplyList],
  ['get', '/install_and_publish', ApplyController.installAndPublish],
  ['get', '/get_release_progress', ApplyController.getReleaseProgress],
  ['get', '/cache/hasModule', ApplyController.hasModule],
  ['get', '/cache/getPublishSuccessModuleConfig', ApplyController.getPublishSuccessModuleConfig],

  // proxy
  ['post', '/cache/removeProxy', ProxyController.removeProxy],

  // router
  ['post', '/cache/removeRouter', RouterController.removeRouter],

  // 模块
  ['post', '/add_module_base_info', ModuleController.addModuleBaseInfo],
  ['get', '/get_module_info', ModuleController.getModuleInfo],
  ['get', '/get_module_config_info', ModuleConfigController.getModuleConfigInfo],
  ['get', '/get_module_full_info', ModuleConfigController.getModuleConfigAndServerInfo],
  ['post', '/add_module_config', ModuleConfigController.addModuleConfig],
  ['post', '/add_server_config', ServerConfigController.addServerConfig],
  ['get', '/module_install_and_publish', ModuleConfigController.installAndPublish],
  ['get', '/get_module_release_progress', ModuleConfigController.getReleaseProgress],
  ['get', '/get_cache_server_list', ServerConfigController.getCacheServerList],
  ['post', '/cache/removeServer', ServerConfigController.removeServer],
  ['get', '/cache/getModuleStruct', ModuleController.getModuleStruct],
  ['get', '/cache/getReleaseProgress', ModuleConfigController.getReleaseProgress],

  // 模块操作
  ['post', '/cache/expandModule', ModuleOperation.expandDCache],
  ['post', '/cache/configTransfer', ModuleOperation.configTransfer, {
    appName: 'notEmpty', moduleName: 'notEmpty', type: 'notEmpty',
  }],
  ['post', '/cache/reduceDcache', ModuleOperation.reduceDcache, {
    appName: 'notEmpty', moduleName: 'notEmpty', srcGroupName: 'notEmpty',
  }],
  ['post', '/cache/stopTransfer', ModuleOperation.stopTransfer, {
    appName: 'notEmpty', moduleName: 'notEmpty', type: 'notEmpty',
  }],
  ['post', '/cache/deleteTransfer', ModuleOperation.deleteTransfer, {
    appName: 'notEmpty', moduleName: 'notEmpty', type: 'notEmpty',
  }],
  ['post', '/cache/deleteOperation', ModuleOperation.deleteOperation, {
    appName: 'notEmpty', moduleName: 'notEmpty', type: 'notEmpty',
  }],
  ['post', '/cache/switchServer', ModuleOperation.switchServer, {
    appName: 'notEmpty', moduleName: 'notEmpty', groupName: 'notEmpty',
  }],
  ['get', '/cache/hasOperation', ModuleOperation.hasOperation, {
    appName: 'notEmpty', moduleName: 'notEmpty',
  }],
  // 查询迁移管理
  ['get', '/cache/getRouterChange', ModuleOperation.getRouterChange],
  // 查询主备切换
  ['get', '/cache/getSwitchInfo', ModuleOperation.getSwitchInfo],
  // 恢复镜像状态
  ['post', '/cache/recoverMirrorStatus', ModuleOperation.recoverMirrorStatus, {
    appName: 'notEmpty', moduleName: 'notEmpty', groupName: 'notEmpty', mirrorIdc: 'notEmpty', dbFlag: 'notEmpty', enableErase: 'notEmpty',
  }],
  // 部署迁移
  ['post', '/cache/transferDCache', ModuleOperation.transferDCache],
  // 非部署迁移
  ['post', '/cache/transferDCacheGroup', ModuleOperation.transferDCacheGroup, {
    appName: 'notEmpty', moduleName: 'notEmpty', srcGroupName: 'notEmpty', dstGroupName: 'notEmpty', transferData: 'notEmpty',
  }],
  // cache 配置中心
  ['get', '/cache/getConfig', getConfig],
  ['post', '/cache/addConfig', addConfig, {
    item: 'notEmpty',
    path: 'notEmpty',
    period: 'notEmpty',
    reload: 'notEmpty',
    remark: 'notEmpty',
  }],
  ['get', '/cache/deleteConfig', deleteConfig, { id: 'notEmpty' }],
  ['post', '/cache/editConfig', editConfig, {
    id: 'notEmpty',
    item: 'notEmpty',
    path: 'notEmpty',
    period: 'notEmpty',
    reload: 'notEmpty',
    remark: 'notEmpty',
  }],
  ['get', '/cache/getModuleConfig', getModuleConfig, { moduleName: 'notEmpty' }],
  ['get', '/cache/getServerConfig', getServerConfig, {
    moduleName: 'notEmpty',
    serverName: 'notEmpty',
    nodeName: 'notEmpty',
  }],
  ['get', '/cache/getServerNodeConfig', getServerNodeConfig, { serverName: 'notEmpty', nodeName: 'notEmpty' }],
  ['post', '/cache/addServerConfigItem', addServerConfigItem, { itemId: 'notEmpty', configValue: 'notEmpty' }],
  ['get', '/cache/deleteServerConfigItem', deleteServerConfigItem, { id: 'notEmpty' }],
  ['get', '/cache/updateServerConfigItem', updateServerConfigItem, { id: 'notEmpty', configValue: 'notEmpty' }],
  ['post', '/cache/updateServerConfigItemBatch', updateServerConfigItemBatch, { serverConfigList: 'notEmpty' }],
  ['post', '/cache/deleteServerConfigItemBatch', deleteServerConfigItemBatch, { serverConfigList: 'notEmpty' }],
  // 业务树
  ['get', '/dtree', ApplyController.dtree],

];

dcacheApiConf.forEach(conf => apiConf.push(conf));
