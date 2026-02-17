import { Injectable, BadGatewayException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private http: HttpService) {}

  async forward(options: {
    baseUrl: string;
    method: string;
    path: string;
    headers: Record<string, any>;
    query: any;
    body: any;
  }): Promise<{ status: number; data: any; headers: Record<string, any> }> {
    const url = `${options.baseUrl}${options.path}`;

    const headers = { ...options.headers };
    delete headers['host'];
    delete headers['content-length'];

    try {
      const res = await firstValueFrom(
        this.http.request({
          url,
          method: options.method as any,
          params: options.query,
          data: options.body,
          headers,
          timeout: 8000,
          validateStatus: () => true, // forward status codes instead of throwing
        }),
      );

      return { status: res.status, data: res.data, headers: res.headers };
    } catch {
      throw new BadGatewayException('Upstream service is unavailable');
    }
  }
}