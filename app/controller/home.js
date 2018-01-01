const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

const {returnSuccess, returnError} = require('../../lib/plugin/response');
class HomeController extends Controller {
    async calendarInfo() {
        const {body: params} = this.ctx.request;
        const {monthPicker, type, info} = params;

        if (type === 'get') {
            this.getCalendarInfo(monthPicker);
        } else if (type === 'save') {
            this.saveCalendarInfo(monthPicker, info);
        } else {
            this.noValidateParams();
        }
    }

    getCalendarInfo(monthPicker) {
        if (!monthPicker) {
            noValidateParams()
            return;
        }
        // 有选择日期
        const dbdata = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db.json'), {encoding: 'utf-8'}) || '{}');
        const r = dbdata[monthPicker];
        if (r) {
            this.returnResult(r);
        } else {
            this.noResult();
        }
    }

    saveCalendarInfo({monthPicker, info}) {

    }

    noValidateParams() {
        this.ctx.body = returnError('validate params');
    }

    noResult() {
        this.ctx.body = returnError('no result');
    }

    returnResult(r) {
        this.ctx.body = returnSuccess(r);
    }
}

module.exports = HomeController;