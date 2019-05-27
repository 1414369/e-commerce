import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '@/_services/logging.service';
import { ErrorService } from '@/_services/error.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private injector: Injector,
    ) { }

    private get toastr(): ToastrService {
        return this.injector.get(ToastrService);
    }

    private get errorService(): ErrorService {
        return this.injector.get(ErrorService);
    }

    private get logger(): LoggingService {
        return this.injector.get(LoggingService);
    }

    handleError(error: Error | HttpErrorResponse) {

        let message;
        let stackTrace;
        if (error instanceof HttpErrorResponse) {
            // Server error
            message = this.errorService.getServerErrorMessage(error);
            //stackTrace = errorService.getServerErrorStackTrace(error);
            this.toastr.error(message, null, { onActivateTick: true });

        } else {
            // Client Error
            message = this.errorService.getClientErrorMessage(error);
            this.toastr.error(message, null, { onActivateTick: true });

        }
        // Always log errors
        this.logger.logError(message, stackTrace);
        console.log(error);
    }
}