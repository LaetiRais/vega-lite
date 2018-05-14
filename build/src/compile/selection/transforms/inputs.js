import { stringValue } from 'vega-util';
import { accessPathWithDatum, varName } from '../../../util';
import { TUPLE } from '../selection';
import nearest from './nearest';
var inputBindings = {
    has: function (selCmpt) {
        return selCmpt.type === 'single' && selCmpt.resolve === 'global' &&
            selCmpt.bind && selCmpt.bind !== 'scales';
    },
    topLevelSignals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var proj = selCmpt.project;
        var bind = selCmpt.bind;
        var datum = nearest.has(selCmpt) ?
            '(item().isVoronoi ? datum.datum : datum)' : 'datum';
        proj.forEach(function (p) {
            var sgname = varName(name + "_" + p.field);
            var hasSignal = signals.filter(function (s) { return s.name === sgname; });
            if (!hasSignal.length) {
                signals.unshift({
                    name: sgname,
                    value: '',
                    on: [{
                            events: selCmpt.events,
                            update: "datum && item().mark.marktype !== 'group' ? " + accessPathWithDatum(p.field, datum) + " : null"
                        }],
                    bind: bind[p.field] || bind[p.channel] || bind
                });
            }
        });
        return signals;
    },
    signals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var proj = selCmpt.project;
        var signal = signals.filter(function (s) { return s.name === name + TUPLE; })[0];
        var fields = proj.map(function (p) { return stringValue(p.field); }).join(', ');
        var values = proj.map(function (p) { return varName(name + "_" + p.field); });
        if (values.length) {
            signal.update = values.join(' && ') + " ? {fields: [" + fields + "], values: [" + values.join(', ') + "]} : null";
        }
        delete signal.value;
        delete signal.on;
        return signals;
    }
};
export default inputBindings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvc2VsZWN0aW9uL3RyYW5zZm9ybXMvaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25DLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUloQyxJQUFNLGFBQWEsR0FBcUI7SUFDdEMsR0FBRyxFQUFFLFVBQVMsT0FBTztRQUNuQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUTtZQUM5RCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDO0lBQzlDLENBQUM7SUFFRCxlQUFlLEVBQUUsVUFBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU87UUFDL0MsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLDBDQUEwQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFTLENBQUM7WUFDckIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFJLElBQUksU0FBSSxDQUFDLENBQUMsS0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFqQixDQUFpQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ2QsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLEVBQUU7b0JBQ1QsRUFBRSxFQUFFLENBQUM7NEJBQ0gsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNOzRCQUN0QixNQUFNLEVBQUUsaURBQStDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVM7eUJBQ3BHLENBQUM7b0JBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJO2lCQUMvQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU8sRUFBRSxVQUFTLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTztRQUN2QyxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLEtBQUssRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxPQUFPLENBQUksSUFBSSxTQUFJLENBQUMsQ0FBQyxLQUFPLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBRTlELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixNQUFNLENBQUMsTUFBTSxHQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFnQixNQUFNLG9CQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQVcsQ0FBQztTQUN6RztRQUVELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQixPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFFakIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c3RyaW5nVmFsdWV9IGZyb20gJ3ZlZ2EtdXRpbCc7XG5pbXBvcnQge2FjY2Vzc1BhdGhXaXRoRGF0dW0sIHZhck5hbWV9IGZyb20gJy4uLy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtUVVBMRX0gZnJvbSAnLi4vc2VsZWN0aW9uJztcbmltcG9ydCBuZWFyZXN0IGZyb20gJy4vbmVhcmVzdCc7XG5pbXBvcnQge1RyYW5zZm9ybUNvbXBpbGVyfSBmcm9tICcuL3RyYW5zZm9ybXMnO1xuXG5cbmNvbnN0IGlucHV0QmluZGluZ3M6VHJhbnNmb3JtQ29tcGlsZXIgPSB7XG4gIGhhczogZnVuY3Rpb24oc2VsQ21wdCkge1xuICAgIHJldHVybiBzZWxDbXB0LnR5cGUgPT09ICdzaW5nbGUnICYmIHNlbENtcHQucmVzb2x2ZSA9PT0gJ2dsb2JhbCcgJiZcbiAgICAgIHNlbENtcHQuYmluZCAmJiBzZWxDbXB0LmJpbmQgIT09ICdzY2FsZXMnO1xuICB9LFxuXG4gIHRvcExldmVsU2lnbmFsczogZnVuY3Rpb24obW9kZWwsIHNlbENtcHQsIHNpZ25hbHMpIHtcbiAgICBjb25zdCBuYW1lID0gc2VsQ21wdC5uYW1lO1xuICAgIGNvbnN0IHByb2ogPSBzZWxDbXB0LnByb2plY3Q7XG4gICAgY29uc3QgYmluZCA9IHNlbENtcHQuYmluZDtcbiAgICBjb25zdCBkYXR1bSA9IG5lYXJlc3QuaGFzKHNlbENtcHQpID9cbiAgICAgICcoaXRlbSgpLmlzVm9yb25vaSA/IGRhdHVtLmRhdHVtIDogZGF0dW0pJyA6ICdkYXR1bSc7XG5cbiAgICBwcm9qLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgY29uc3Qgc2duYW1lID0gdmFyTmFtZShgJHtuYW1lfV8ke3AuZmllbGR9YCk7XG4gICAgICBjb25zdCBoYXNTaWduYWwgPSBzaWduYWxzLmZpbHRlcigocykgPT4gcy5uYW1lID09PSBzZ25hbWUpO1xuICAgICAgaWYgKCFoYXNTaWduYWwubGVuZ3RoKSB7XG4gICAgICAgIHNpZ25hbHMudW5zaGlmdCh7XG4gICAgICAgICAgbmFtZTogc2duYW1lLFxuICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICBvbjogW3tcbiAgICAgICAgICAgIGV2ZW50czogc2VsQ21wdC5ldmVudHMsXG4gICAgICAgICAgICB1cGRhdGU6IGBkYXR1bSAmJiBpdGVtKCkubWFyay5tYXJrdHlwZSAhPT0gJ2dyb3VwJyA/ICR7YWNjZXNzUGF0aFdpdGhEYXR1bShwLmZpZWxkLCBkYXR1bSl9IDogbnVsbGBcbiAgICAgICAgICB9XSxcbiAgICAgICAgICBiaW5kOiBiaW5kW3AuZmllbGRdIHx8IGJpbmRbcC5jaGFubmVsXSB8fCBiaW5kXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNpZ25hbHM7XG4gIH0sXG5cbiAgc2lnbmFsczogZnVuY3Rpb24obW9kZWwsIHNlbENtcHQsIHNpZ25hbHMpIHtcbiAgICBjb25zdCBuYW1lID0gc2VsQ21wdC5uYW1lO1xuICAgIGNvbnN0IHByb2ogPSBzZWxDbXB0LnByb2plY3Q7XG4gICAgY29uc3Qgc2lnbmFsID0gc2lnbmFscy5maWx0ZXIoKHMpID0+IHMubmFtZSA9PT0gbmFtZSArIFRVUExFKVswXTtcbiAgICBjb25zdCBmaWVsZHMgPSBwcm9qLm1hcCgocCkgPT4gc3RyaW5nVmFsdWUocC5maWVsZCkpLmpvaW4oJywgJyk7XG4gICAgY29uc3QgdmFsdWVzID0gcHJvai5tYXAoKHApID0+IHZhck5hbWUoYCR7bmFtZX1fJHtwLmZpZWxkfWApKTtcblxuICAgIGlmICh2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICBzaWduYWwudXBkYXRlID0gYCR7dmFsdWVzLmpvaW4oJyAmJiAnKX0gPyB7ZmllbGRzOiBbJHtmaWVsZHN9XSwgdmFsdWVzOiBbJHt2YWx1ZXMuam9pbignLCAnKX1dfSA6IG51bGxgO1xuICAgIH1cblxuICAgIGRlbGV0ZSBzaWduYWwudmFsdWU7XG4gICAgZGVsZXRlIHNpZ25hbC5vbjtcblxuICAgIHJldHVybiBzaWduYWxzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbnB1dEJpbmRpbmdzO1xuIl19